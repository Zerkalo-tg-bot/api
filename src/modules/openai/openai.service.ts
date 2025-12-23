import { BaseApiService } from "@shared/services";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import OpenAI from "openai";
import { ConfigService } from "@nestjs/config";
import { IOpenAIMessage } from "./model/interfaces";
import { ChatCompletionTool, ChatCompletionMessageParam } from "openai/resources";

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
  async sendMessage(messages: IOpenAIMessage[]): Promise<string> {
    if (!messages || messages.length === 0) {
      throw new Error("Messages array cannot be empty");
    }
    const response = await this.#openai.chat.completions.create({
      model: this.#model,
      messages,
    });

    const content = response.choices[0].message?.content;
    if (!content) {
      throw new Error("No content in OpenAI response");
    }
    return content;
  }

  /**
   * Sends a chat completion request with tools support and handles tool calls in a loop.
   *
   * @param messages An array of messages to send to the OpenAI chat completion endpoint
   * @param tools An array of tools that can be called by the assistant
   * @param onToolCall Callback function to execute when a tool is called
   * @param maxIterations Maximum number of iterations to prevent infinite loops (default: 10)
   * @returns The final content of the assistant's reply
   */
  async sendMessageWithTools(
    messages: IOpenAIMessage[],
    tools: ChatCompletionTool[],
    onToolCall: (name: string, args: any) => Promise<any>,
    maxIterations: number = 10,
  ): Promise<string> {
    if (!messages || messages.length === 0) {
      throw new Error("Messages array cannot be empty");
    }

    const conversationMessages: ChatCompletionMessageParam[] = [...messages];
    let iterations = 0;

    while (iterations < maxIterations) {
      iterations++;

      const response = await this.#openai.chat.completions.create({
        model: this.#model,
        messages: conversationMessages,
        tools: tools.length > 0 ? tools : undefined,
      });

      const message = response.choices[0].message;
      conversationMessages.push(message);

      // If no tool calls, return the content
      if (!message.tool_calls || message.tool_calls.length === 0) {
        return message.content || "";
      }

      // Execute all tool calls
      for (const toolCall of message.tool_calls) {
        console.log("Executing tool call:", toolCall);
        if (toolCall.type === "function" && "function" in toolCall) {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);

          // Execute the tool via callback
          const result = await onToolCall(functionName, functionArgs);

          // Add tool response to conversation
          conversationMessages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          });
        } else {
          console.warn("Unknown tool call type or missing function property:", toolCall);
        }
      }
    }

    throw new Error(`Max iterations (${maxIterations}) reached in sendMessageWithTools`);
  }
}
