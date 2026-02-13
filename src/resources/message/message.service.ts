import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { mapMessageToOpenAIMessage } from "./model/mappers";
import { PrismaService } from "@modules/prisma";
import { EOpenAIMessageRole, OpenaiService, IOpenAIMessage } from "@modules/openai";
import { PromptService } from "@modules/prompt";
import { Message, MessageRole } from "@prisma/client";
import { MessageResponseDto, SendMessageDto } from "./dto";
import { UserService } from "../user";

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);
  constructor(
    private readonly openai: OpenaiService,
    private readonly prisma: PrismaService,
    private readonly promptService: PromptService,
    private readonly userService: UserService,
  ) {}

  /**
   * Sends a message from the user and processes the assistant's response.
   *
   * @param telegramUserId The Telegram user ID
   * @param message The message DTO containing the user's message
   * @returns The assistant's response
   */
  async sendMessage(telegramUserId: number, message: SendMessageDto): Promise<MessageResponseDto> {
    await this.userService.getUser(telegramUserId);
    let history: Message[] = [];
    try {
      history = await this.prisma.message.findMany({
        where: { telegramUserId },
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      });
    } catch (error) {
      this.logger.error(`Failed to fetch message history for user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to fetch message history`);
    }

    let botBehaviorPrompt: string;
    try {
      botBehaviorPrompt = await this.promptService.getBotBehaviorPrompt();
    } catch (error) {
      this.logger.error(`Failed to fetch bot behavior prompt`, error);
      throw new InternalServerErrorException("Failed to fetch bot behavior prompt");
    }

    const openAIMessages: IOpenAIMessage[] = [
      {
        role: EOpenAIMessageRole.SYSTEM,
        content: botBehaviorPrompt,
      },
      ...history.map((msg) => mapMessageToOpenAIMessage(msg)),
    ];
    openAIMessages.push({ role: EOpenAIMessageRole.USER, content: message.content });

    let response: string;
    try {
      response = await this.openai.sendMessage(openAIMessages);
    } catch (error) {
      this.logger.error(`Failed to generate response from OpenAI for user ${telegramUserId}`, error);
      throw new InternalServerErrorException("Failed to generate response from OpenAI");
    }

    try {
      await this.prisma.$transaction([
        this.prisma.message.create({
          data: {
            telegramUserId: telegramUserId,
            role: MessageRole.USER,
            content: message.content,
          },
        }),
        this.prisma.message.create({
          data: {
            telegramUserId: telegramUserId,
            role: MessageRole.ASSISTANT,
            content: response,
          },
        }),
      ]);
    } catch (error) {
      this.logger.error(`Failed to save messages for user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to save messages`);
    }

    const responseMessage: MessageResponseDto = { content: response };
    return responseMessage;
  }

  /**
   * Generates a greeting message for the user using OpenAI.
   *
   * @param  telegramUserId The Telegram user ID
   * @returns The greeting message
   */
  async getGreeting(telegramUserId: number): Promise<MessageResponseDto> {
    await this.userService.getUser(telegramUserId);
    let prompt: string;
    try {
      prompt = await this.promptService.getBotBehaviorPrompt();
    } catch (error) {
      this.logger.error("Failed to fetch bot behavior prompt", error);
      throw new InternalServerErrorException("Failed to fetch bot behavior prompt");
    }

    let response: string;

    try {
      response = await this.openai.sendMessage([
        {
          role: EOpenAIMessageRole.SYSTEM,
          content: prompt,
        },
      ]);
    } catch (error) {
      this.logger.error("Failed to generate greeting message", error);
      throw new InternalServerErrorException("Failed to generate greeting message");
    }

    try {
      await this.prisma.message.create({
        data: {
          telegramUserId,
          role: MessageRole.ASSISTANT,
          content: response,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to save greeting message for user ${telegramUserId}`, error);
      throw new InternalServerErrorException(`Failed to save greeting message`);
    }

    return { content: response };
  }
}
