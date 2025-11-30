import { Injectable } from "@nestjs/common";
import { OpenaiService, PromptService } from "@/services";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Injectable()
export class ChatService {
  async createChatSession(telegramUserId: string) {}

  async deleteChatSession(telegramUserId: string) {}
}
