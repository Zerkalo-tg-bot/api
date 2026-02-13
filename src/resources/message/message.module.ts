import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { PrismaModule } from "@modules/prisma";
import { OpenaiModule } from "@modules/openai";
import { PromptModule } from "@modules/prompt";
import { UserModule } from "../user";

@Module({
  imports: [PrismaModule, OpenaiModule, PromptModule, UserModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
