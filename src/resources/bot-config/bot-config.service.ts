import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { GoogleDocsService } from "../../modules/google-docs/google-docs.service";
import { ConfigService } from "@nestjs/config";
import { BotDisclaimerDto } from "./dto/bot-disclaimer.dto";

@Injectable()
export class BotConfigService {
  #disclaimerDocumentId: string;

  constructor(
    private readonly docsService: GoogleDocsService,
    private readonly configService: ConfigService,
  ) {
    this.#disclaimerDocumentId = this.configService.get<string>("bot.disclaimerDocumentId")!;
  }

  async getBotDisclaimer(): Promise<BotDisclaimerDto> {
    console.log(`Fetching bot disclaimer from Google Docs with document ID: ${this.#disclaimerDocumentId}`);
    let disclaimer = "";
    try {
      disclaimer = await this.docsService.getPublicDocumentContent(this.#disclaimerDocumentId);
      if (!disclaimer) {
        console.error("Disclaimer document is empty");
        throw new Error("Disclaimer document is empty");
      }
    } catch (error) {
      console.error("Error fetching disclaimer document:", error);
      throw new InternalServerErrorException(`Failed to fetch disclaimer document`);
    }
    return { content: disclaimer };
  }
}
