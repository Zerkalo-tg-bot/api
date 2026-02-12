import { Module } from "@nestjs/common";
import { BotConfigService } from "./bot-config.service";
import { GoogleDocsModule } from "../../modules/google-docs/google-docs.module";
import { BotConfigController } from "./bot-config.controller";

@Module({
  imports: [GoogleDocsModule],
  controllers: [BotConfigController],
  providers: [BotConfigService],
})
export class BotConfigModule {}
