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

    if (response) {
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
  }

  async getGreeting(telegramUserId: number) {
    const prompt = await this.promptService.getBotBehaviorPrompt();
    const response = await this.openai.sendMessage([
      {
        role: "system",
        content: prompt,
      },
    ]);
    if (!response) return new InternalServerErrorException("Failed to get greeting from OpenAI");
    await this.prisma.message.create({
      data: {
        telegramUserId,
        role: "assistant",
        content: response || "Привет!",
      },
    });
    return response;
  }
}
