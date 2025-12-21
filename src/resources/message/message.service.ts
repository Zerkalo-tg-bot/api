import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MessageDto } from "./dto/message.dto";
import { IMessage } from "./entities/message";
import { mapMessageToOpenAIMessage } from "./model/mappers";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { OpenaiService } from "@/modules/openai/openai.service";
import { PromptService } from "@/modules/prompt/prompt.service";
import { IOpenAIMessage } from "@/modules/openai";

@Injectable()
export class MessageService {
  constructor(
    private readonly openai: OpenaiService,
    private readonly prisma: PrismaService,
    private readonly promptService: PromptService,
  ) {}

  /**
   * Sends a message from the user and processes the assistant's response.
   *
   * @param telegramUserId The Telegram user ID
   * @param message The message DTO containing the user's message
   * @returns The assistant's response
   */
  async sendMessage(telegramUserId: number, message: MessageDto) {
    const history = (await this.prisma.message.findMany({
      where: { telegramUserId },
    })) as IMessage[];

    const prompt = await this.promptService.getBotBehaviorPrompt();

    const openAIMessages: IOpenAIMessage[] = [
      {
        role: "system",
        content: prompt,
      },
      ...history.map((msg) => mapMessageToOpenAIMessage(msg)),
    ];
    openAIMessages.push({ role: "user", content: message.content });

    const response = await this.openai.sendMessage(openAIMessages);

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

    return response;
  }

  /**
   * Generates a greeting message for the user using OpenAI.
   *
   * @param  telegramUserId The Telegram user ID
   * @returns The greeting message
   */
  async getGreeting(telegramUserId: number) {
    const prompt = await this.promptService.getBotBehaviorPrompt();
    const response = await this.openai.sendMessage([
      {
        role: "system",
        content: prompt,
      },
    ]);
    await this.prisma.message.create({
      data: {
        telegramUserId,
        role: "assistant",
        content: response,
      },
    });
    return response;
  }
}
