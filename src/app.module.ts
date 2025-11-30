import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { OpenaiService } from "@services/index";
import { openaiConfig, promptsConfig } from "@config/index";
import { HttpModule } from "@nestjs/axios";
import { ChatModule } from "@resources/chat/chat.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { GoogleDocsService } from "./services/google-docs/google-docs.service";
import { PromptService } from "./services/prompt/prompt.service";
import { MessageModule } from './resources/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [openaiConfig, promptsConfig],
    }),
    HttpModule,
    ChatModule,
    PrismaModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService, GoogleDocsService, PromptService],
})
export class AppModule {}
