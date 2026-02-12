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

  /**
   * Retrieves the bot behavior prompt from the configured Google Docs document.
   *
   * @returns A promise that resolves to the bot behavior prompt as a string
   */
  async getBotBehaviorPrompt() {
    try {
      const prompt = await this.googleDocsService.getPublicDocumentContent(this.#botPromptDocumentId);
      return prompt;
    } catch (error) {
      throw new Error(`Failed to fetch bot behavior prompt:\n${error.message}`);
    }
  }
}
