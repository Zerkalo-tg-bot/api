import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { HttpModule } from "@nestjs/axios";
import { OpenaiModule } from "@/modules/openai/openai.module";
import { PromptModule } from "@/modules/prompt/prompt.module";

@Module({
  imports: [PrismaModule, HttpModule, OpenaiModule, PromptModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
