import { Controller, Post, Body } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { MessageDto } from "./dto/message.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  sendMessage(@Body() message: MessageDto) {
    console.log("API - got message", message);
    return this.chatService.sendMessage(message);
  }
}
