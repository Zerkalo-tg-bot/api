import { Controller, Delete, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("chat")
@Controller(":telegramUserId/chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Delete()
  @ApiOperation({ summary: "Reset chat state" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiResponse({ status: 200, description: "Chat state was reset successfully." })
  async resetChatState(@Param("telegramUserId") telegramUserId: string) {
    return this.chatService.resetChatState(+telegramUserId);
  }
}
