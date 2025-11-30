import { Controller, Post, Body } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./dto/message.dto";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@Body() message: MessageDto) {
    return this.messageService.sendMessage(message);
  }
}
