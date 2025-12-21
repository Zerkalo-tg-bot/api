import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./dto/message.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("message")
@Controller(":telegramUserId/message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: "Send a message" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiBody({ type: MessageDto, description: "Message payload", examples: {
    example1: {
      summary: "Simple message",
      value: { content: "Hello, I have a problem. Can you help me?" }
    }
  } })
  @ApiResponse({ status: 201, description: "Message sent successfully." })
  async sendMessage(@Param("telegramUserId") telegramUserId: string, @Body() message: MessageDto) {
    return this.messageService.sendMessage(+telegramUserId, message);
  }

  @Get("greeting")
  @ApiOperation({ summary: "Get greeting message" })
  @ApiParam({ name: "telegramUserId", description: "Telegram User ID" })
  @ApiResponse({ status: 200, description: "Greeting message was generated successfully." })
  async getGreeting(@Param("telegramUserId") telegramUserId: string) {
    return this.messageService.getGreeting(+telegramUserId);
  }
}
