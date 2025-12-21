import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("chat")
@Controller(":telegramUserId/chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: "Reset chat state" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiResponse({ status: 204, description: "Chat state was reset successfully." })
  async resetChatState(@Param("telegramUserId") telegramUserId: string) {
    await this.chatService.resetChatState(+telegramUserId);
  }
}
