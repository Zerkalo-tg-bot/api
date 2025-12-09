import { Controller, Delete, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller(":telegramUserId/chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Delete()
  async resetChatState(@Param("telegramUserId") telegramUserId: string) {
    return this.chatService.resetChatState(+telegramUserId);
  }
}
