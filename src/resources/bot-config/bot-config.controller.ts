import { Controller, Get } from "@nestjs/common";
import { BotConfigService } from "./bot-config.service";

@Controller("bot-config")
export class BotConfigController {
  constructor(private readonly botConfigService: BotConfigService) {}

  @Get("disclaimer")
  getDisclaimer() {
    return this.botConfigService.getBotDisclaimer();
  }
}
