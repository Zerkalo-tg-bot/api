import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./dto/message.dto";

@Controller(":telegramUserId/message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@Param("telegramUserId") telegramUserId: string, @Body() message: MessageDto) {
    return this.messageService.sendMessage(+telegramUserId, message);
  }

  @Get("greeting")
  async getGreeting(@Param("telegramUserId") telegramUserId: string) {
    return this.messageService.getGreeting(+telegramUserId);
  }
}
