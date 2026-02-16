import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { MessageService } from "./message.service";

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { MessageResponseDto, SendMessageDto } from "./dto";

@ApiTags("message")
@Controller(":telegramUserId/message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: "Send a message" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID", example: 123456789 })
  @ApiBody({
    type: SendMessageDto,
    description: "Message payload",
    examples: {
      example1: {
        summary: "Simple message",
        value: { content: "Hello, I have a problem. Can you help me?" },
      },
    },
  })
  @ApiCreatedResponse({ description: "Message sent successfully.", type: MessageResponseDto })
  @ApiBadRequestResponse({ description: "Validation error" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  async sendMessage(
    @Param("telegramUserId") telegramUserId: string,
    @Body() message: SendMessageDto,
  ): Promise<MessageResponseDto> {
    return this.messageService.sendMessage(+telegramUserId, message);
  }

  @Get("greeting")
  @ApiOperation({ summary: "Get greeting message" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID", example: 123456789 })
  @ApiOkResponse({ description: "Greeting message was generated successfully.", type: MessageResponseDto })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  async getGreeting(@Param("telegramUserId") telegramUserId: string): Promise<MessageResponseDto> {
    return this.messageService.getGreeting(+telegramUserId);
  }
}
