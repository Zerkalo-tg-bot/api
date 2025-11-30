import { Injectable } from "@nestjs/common";
import { GoogleDocsService } from "../google-docs/google-docs.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PromptService {
  #botPromptDocumentId: string;
  constructor(
    private readonly googleDocsService: GoogleDocsService,
    private readonly configService: ConfigService,
  ) {
    this.#botPromptDocumentId = this.configService.get<string>("prompts.botPromptDocumentId")!;
  }

  getBotPrompt() {
    return this.googleDocsService.getPublicDocumentContent(this.#botPromptDocumentId);
  }
}
