import { Controller, Delete, HttpCode, Param, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { UserResponseDto } from "@resources/user/dto/user-response.dto";

@ApiTags("chat")
@Controller(":telegramUserId/chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: "Start chat session" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID", example: 123456789 })
  @ApiCreatedResponse({ description: "Chat session started successfully.", type: UserResponseDto })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  async startChatSession(@Param("telegramUserId") telegramUserId: string): Promise<UserResponseDto> {
    return this.chatService.startChatSession(+telegramUserId);
  }

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: "Reset chat state" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID", example: 123456789 })
  @ApiNoContentResponse({ description: "Chat state was reset successfully." })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  async resetChatState(@Param("telegramUserId") telegramUserId: string) {
    await this.chatService.resetChatState(+telegramUserId);
  }
}
