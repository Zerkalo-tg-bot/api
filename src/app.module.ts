import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { openaiConfig, promptsConfig } from "@config/index";
import { ChatModule } from "@resources/chat/chat.module";
import { MessageModule } from "./resources/message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [openaiConfig, promptsConfig],
    }),
    ChatModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
