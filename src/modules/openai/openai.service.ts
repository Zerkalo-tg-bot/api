import { BaseApiService } from "@shared/services";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";
import { IOpenAIMessage } from "./model/interfaces";

@Injectable()
export class OpenaiService extends BaseApiService {
  readonly #openai: OpenAI;
  readonly #model: string;
  constructor(
    httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super(httpService, "https://api.openai.com/v1");

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
  async sendMessage(messages: IOpenAIMessage[]) {
    if (!messages || messages.length === 0) {
      throw new Error("Messages array cannot be empty");
    }
    const response = await this.#openai.chat.completions.create({
      model: this.#model,
      messages,
      tools: [],
    });

    const content = response.choices[0].message?.content;
    if (!content) {
      throw new Error("No content in OpenAI response");
    }
    return content;
  }
}
