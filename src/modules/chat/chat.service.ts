import { Injectable } from "@nestjs/common";
import { OpenaiService } from "@/services";
import { MessageDto } from "./dto/message.dto";

@Injectable()
export class ChatService {
  constructor(private readonly openaiService: OpenaiService) {}
  create(message: MessageDto) {
    return this.openaiService.sendMessage(message.text);
  }
}
