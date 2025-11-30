import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { OpenaiService, PromptService, GoogleDocsService } from "@/services";
import { PrismaModule } from "@/modules/prisma/prisma.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule],
  controllers: [MessageController],
  providers: [MessageService, OpenaiService, PromptService, GoogleDocsService],
})
export class MessageModule {}
