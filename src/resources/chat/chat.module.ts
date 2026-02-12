import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
