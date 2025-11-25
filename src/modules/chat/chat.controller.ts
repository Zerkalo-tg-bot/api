import { Controller, Post, Body } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { MessageDto } from "./dto/message.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() message: MessageDto) {
    return this.chatService.create(message);
  }
}
