import { Injectable } from "@nestjs/common";
import { OpenaiService } from "@/services";
import { MessageDto } from "./dto/message.dto";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { IOpenAIMessage } from "@/services/openai/model";

@Injectable()
export class ChatService {
  constructor(
    private readonly openai: OpenaiService,
    private readonly prisma: PrismaService,
  ) {}

  async sendMessage(message: MessageDto) {
    try {
      const history = await this.prisma.message.findMany({
        where: { telegramUserId: message.telegramUserId },
      });

      const openAIMessages: IOpenAIMessage[] = historyToOpenAIMessages(history);
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
      console.error("Error in ChatService.create:", error);
    }
  }
}

function historyToOpenAIMessages(history: any[]): IOpenAIMessage[] {
  return history.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}
