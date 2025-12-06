import { Controller, Post, Body, Delete, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Delete(":telegramUserId")
  async resetChatState(@Param("telegramUserId") telegramUserId: string) {
    return this.chatService.resetChatState(+telegramUserId);
  }
}
