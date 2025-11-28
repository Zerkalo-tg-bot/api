import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { OpenaiService } from "@services/index";
import openaiConfig from "@config/index";
import { HttpModule } from "@nestjs/axios";
import { ChatModule } from "@resources/chat/chat.module";
import { PrismaModule } from "./modules/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [openaiConfig],
    }),
    HttpModule,
    ChatModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
