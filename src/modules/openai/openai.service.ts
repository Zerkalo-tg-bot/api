import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";
import { IOpenAIMessage } from "./model/interfaces";

@Injectable()
export class OpenaiService {
  readonly #openai: OpenAI;
  readonly #model: string;
  constructor(private readonly configService: ConfigService) {
    this.#openai = new OpenAI({
      apiKey: this.configService.get<string>("openai.apiKey"),
    });
    this.#model = this.configService.get<string>("openai.model") || "gpt-4";
  }

  /**
   * Sends a chat completion request to the OpenAI API with the given messages.
   *
   * @param messages An array of messages to send to the OpenAI chat completion endpoint
   * @returns The content of the assistant's reply
   */
  async sendMessage(messages: IOpenAIMessage[]): Promise<string> {
    if (!messages || messages.length === 0) {
      throw new Error("Messages array cannot be empty");
    }

    let response: OpenAI.Chat.Completions.ChatCompletion;
    try {
      response = await this.#openai.chat.completions.create({
        model: this.#model,
        messages,
      });
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error(`Failed to call OpenAI API:\n${error.message}`);
    }

    const content = response.choices[0].message?.content;
    if (!content) {
      throw new Error("No content in OpenAI response");
    }
    return content;
  }
}
