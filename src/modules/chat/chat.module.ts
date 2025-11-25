import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { OpenaiService } from "@/services";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [ChatController],
  providers: [ChatService, OpenaiService],
})
export class ChatModule {}
