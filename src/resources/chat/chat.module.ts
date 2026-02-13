import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { PrismaModule } from "@modules/prisma";
import { UserModule } from "@resources/user";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
