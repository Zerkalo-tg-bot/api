import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IMessage } from "./entities/message";
import { mapMessageToOpenAIMessage } from "./model/mappers";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { OpenaiService } from "@/modules/openai/openai.service";
import { PromptService } from "@/modules/prompt/prompt.service";
import { IOpenAIMessage } from "@/modules/openai";
import { FactService } from "@/resources/fact/fact.service";
import { MESSAGE_OPENAI_TOOLS } from "./model/openaiTools";
import { EOpenAIMessageRole } from "@/modules/openai/model/interfaces";
import { MessageResponseDto, SendMessageDto } from "./dto";

@Injectable()
export class MessageService {
  constructor(
    private readonly openai: OpenaiService,
    private readonly prisma: PrismaService,
    private readonly promptService: PromptService,
    private readonly factService: FactService,
  ) {}

  /**
   * Sends a message from the user and processes the assistant's response.
   *
   * @param telegramUserId The Telegram user ID
   * @param message The message DTO containing the user's message
   * @returns The assistant's response
   */
  async sendMessage(telegramUserId: number, message: SendMessageDto): Promise<MessageResponseDto> {
    let history: IMessage[] = [];
    try {
      history = (await this.prisma.message.findMany({
        where: { telegramUserId },
      })) as IMessage[];
    } catch (error) {
      console.error(`Failed to fetch message history for user ${telegramUserId}:`, error);
      throw new InternalServerErrorException(`Failed to fetch message history`);
    }

    let botBehaviorPrompt: string;
    let botMessageToolsPrompt: string;
    try {
      [botBehaviorPrompt, botMessageToolsPrompt] = await Promise.all([
        this.promptService.getBotBehaviorPrompt(),
        this.promptService.getBotMessageToolsPrompt(),
      ]);
    } catch (error) {
      console.error("Failed to fetch bot prompts", error);
      throw new InternalServerErrorException("Failed to fetch bot prompts");
    }

    const systemPrompt = `${botBehaviorPrompt}\n\n${botMessageToolsPrompt}`;

    const openAIMessages: IOpenAIMessage[] = [
      {
        role: EOpenAIMessageRole.SYSTEM,
        content: systemPrompt,
      },
      ...history.map((msg) => mapMessageToOpenAIMessage(msg)),
    ];
    openAIMessages.push({ role: EOpenAIMessageRole.USER, content: message.content });

    const response = await this.openai.sendMessageWithTools(
      openAIMessages,
      MESSAGE_OPENAI_TOOLS,
      async (functionName: string, args: any) => {
        return await this.executeToolCall(telegramUserId, functionName, args);
      },
    );

    try {
      await this.prisma.message.create({
        data: {
          telegramUserId: telegramUserId,
          role: "user",
          content: message.content,
        },
      });

      await this.prisma.message.create({
        data: {
          telegramUserId: telegramUserId,
          role: "assistant",
          content: response,
        },
      });
    } catch (error) {
      console.error(`Failed to save messages for user ${telegramUserId}:`, error);
      throw new InternalServerErrorException(`Failed to save messages`);
    }

    return { content: response };
  }

  /**
   * Generates a greeting message for the user using OpenAI.
   *
   * @param  telegramUserId The Telegram user ID
   * @returns The greeting message
   */
  async getGreeting(telegramUserId: number): Promise<MessageResponseDto> {
    let prompt: string;
    try {
      prompt = await this.promptService.getBotBehaviorPrompt();
    } catch (error) {
      console.error("Failed to fetch bot behavior prompt", error);
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
      console.error("Failed to generate greeting message", error);
      throw new InternalServerErrorException("Failed to generate greeting message");
    }

    try {
      await this.prisma.message.create({
        data: {
          telegramUserId,
          role: EOpenAIMessageRole.ASSISTANT,
          content: response,
        },
      });
    } catch (error) {
      console.error(`Failed to save greeting message for user ${telegramUserId}:`, error);
      throw new InternalServerErrorException(`Failed to save greeting message`);
    }

    return { content: response };
  }

  /**
   * Executes a tool call based on the function name.
   *
   * @param telegramUserId The Telegram user ID
   * @param functionName The name of the function to execute
   * @param args The arguments for the function
   * @returns The result of the function execution
   */
  private async executeToolCall(telegramUserId: number, functionName: string, args: any): Promise<any> {
    switch (functionName) {
      case "get_user_facts": {
        const facts = await this.factService.findAll(telegramUserId);
        return {
          facts: facts.map((fact) => ({
            id: fact.id,
            content: fact.content,
            createdAt: fact.createdAt,
          })),
        };
      }

      case "set_user_fact": {
        const fact = await this.factService.create(telegramUserId, {
          content: args.content,
        });
        return {
          success: true,
          fact: {
            id: fact.id,
            content: fact.content,
          },
        };
      }

      case "delete_user_fact": {
        const deletedFact = await this.factService.remove(telegramUserId, args.id);
        return { success: !!deletedFact };
      }

      default:
        throw new Error(`Unknown function: ${functionName}`);
    }
  }
}
