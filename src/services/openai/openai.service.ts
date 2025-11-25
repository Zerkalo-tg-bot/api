import { BaseApiService } from "@shared/services";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";
import { from, map } from "rxjs";

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

  async sendMessage(message: string) {
    return from(
      this.#openai.chat.completions.create({
        model: this.#model,
        messages: [{ role: "user", content: message }],
      }),
    ).pipe(map((response) => response.choices[0].message?.content || ""));
  }
}
