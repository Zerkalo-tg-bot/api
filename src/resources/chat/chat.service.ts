import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
  async createChatSession(telegramUserId: string) {}

  async deleteChatSession(telegramUserId: string) {}
}
