import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { GoogleDocsService } from "../../modules/google-docs/google-docs.service";
import { ConfigService } from "@nestjs/config";
import { BotDisclaimerDto } from "./dto/bot-disclaimer.dto";

@Injectable()
export class BotConfigService {
  private readonly logger = new Logger(BotConfigService.name);
  #disclaimerDocumentId: string;

  constructor(
    private readonly docsService: GoogleDocsService,
    private readonly configService: ConfigService,
  ) {
    this.#disclaimerDocumentId = this.configService.get<string>("bot.disclaimerDocumentId")!;
  }

  async getBotDisclaimer(): Promise<BotDisclaimerDto> {
    let disclaimer = "";
    try {
      disclaimer = await this.docsService.getPublicDocumentContent(this.#disclaimerDocumentId);
      if (!disclaimer) {
        throw new Error("Disclaimer document is empty");
      }
    } catch (error) {
      this.logger.error("Error fetching disclaimer document:", error);
      throw new InternalServerErrorException(`Failed to fetch disclaimer document`);
    }
    return { content: disclaimer };
  }
}
