import { Injectable } from "@nestjs/common";
import { MessageDto } from "./dto/message.dto";
import { IMessage } from "./entities/message";
import { mapMessageToOpenAIMessage } from "./model/mappers";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { IOpenAIMessage } from "@/modules/openai/model";
import { OpenaiService } from "@/modules/openai/openai.service";
import { PromptService } from "@/modules/prompt/prompt.service";

@Injectable()
export class MessageService {
  constructor(
    private readonly openai: OpenaiService,
    private readonly prisma: PrismaService,
    private readonly promptService: PromptService,
  ) {}

  async sendMessage(message: MessageDto) {
    try {
      const history = (await this.prisma.message.findMany({
        where: { telegramUserId: message.telegramUserId },
      })) as IMessage[];

      const prompt = await this.promptService.getBotPrompt();

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
            telegramUserId: message.telegramUserId,
            role: "user",
            content: message.content,
          },
        });

        await this.prisma.message.create({
          data: {
            telegramUserId: message.telegramUserId,
            role: "assistant",
            content: response,
          },
        });

        return response;
      }
    } catch (error) {
      console.error("Error in MessageService.sendMessage:", error);
    }
  }
}
