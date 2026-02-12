import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { openaiConfig, promptsConfig } from "@config/index";
import { ChatModule } from "@resources/chat/chat.module";
import { MessageModule } from "./resources/message/message.module";
import { BotConfigModule } from "./resources/bot-config/bot-config.module";
import { UserModule } from "./resources/user/user.module";
import botConfig from "./config/bot.config";
import { validateEnv } from "./config/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [openaiConfig, promptsConfig, botConfig],
      validate: validateEnv,
    }),
    ChatModule,
    MessageModule,
    BotConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
