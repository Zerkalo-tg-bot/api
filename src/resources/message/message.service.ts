import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MessageDto } from "./dto/message.dto";
import { IMessage } from "./entities/message";
import { mapMessageToOpenAIMessage } from "./model/mappers";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { OpenaiService } from "@/modules/openai/openai.service";
import { PromptService } from "@/modules/prompt/prompt.service";
import { IOpenAIMessage } from "@/modules/openai";
import { FactService } from "@/resources/fact/fact.service";
import { MESSAGE_OPENAI_TOOLS } from "./model/openaiTools";

@Injectable()
export class MessageService {
  constructor(
    private readonly openai: OpenaiService,
    private readonly prisma: PrismaService,
    private readonly promptService: PromptService,
    private readonly factService: FactService,
  ) {}

  /**
   * Sends a message from the user and processes the assistant's response.
   *
   * @param telegramUserId The Telegram user ID
   * @param message The message DTO containing the user's message
   * @returns The assistant's response
   */
  async sendMessage(telegramUserId: number, message: MessageDto) {
    const history = (await this.prisma.message.findMany({
      where: { telegramUserId },
    })) as IMessage[];

    const [botBehaviorPrompt, botMessageToolsPrompt] = await Promise.all([
      this.promptService.getBotBehaviorPrompt(),
      this.promptService.getBotMessageToolsPrompt(),
    ]);

    const systemPrompt = `${botBehaviorPrompt}\n\n${botMessageToolsPrompt}`;

    const openAIMessages: IOpenAIMessage[] = [
      {
        role: "system",
        content: systemPrompt,
      },

      ...history.map((msg) => mapMessageToOpenAIMessage(msg)),
    ];
    openAIMessages.push({ role: "user", content: message.content });

    const response = await this.openai.sendMessageWithTools(
      openAIMessages,
      MESSAGE_OPENAI_TOOLS,
      async (functionName: string, args: any) => {
        return await this.executeToolCall(telegramUserId, functionName, args);
      },
    );

    await this.prisma.message.create({
      data: {
        telegramUserId: telegramUserId,
        role: "user",
        content: message.content,
      },
    });

    await this.prisma.message.create({
      data: {
        telegramUserId: telegramUserId,
        role: "assistant",
        content: response,
      },
    });

    return response;
  }

  /**
   * Executes a tool call based on the function name.
   *
   * @param telegramUserId The Telegram user ID
   * @param functionName The name of the function to execute
   * @param args The arguments for the function
   * @returns The result of the function execution
   */
  private async executeToolCall(telegramUserId: number, functionName: string, args: any): Promise<any> {
    switch (functionName) {
      case "get_user_facts": {
        const facts = await this.factService.findAll(telegramUserId);
        return {
          facts: facts.map((fact) => ({
            id: fact.id,
            content: fact.content,
            createdAt: fact.createdAt,
          })),
        };
      }

      case "set_user_fact": {
        const fact = await this.factService.create(telegramUserId, {
          content: args.content,
        });
        return {
          success: true,
          fact: {
            id: fact.id,
            content: fact.content,
          },
        };
      }

      case "delete_user_fact": {
        const deletedFact = await this.factService.remove(telegramUserId, args.id);
        return { success: !!deletedFact };
      }

      default:
        throw new Error(`Unknown function: ${functionName}`);
    }
  }

  /**
   * Generates a greeting message for the user using OpenAI.
   *
   * @param  telegramUserId The Telegram user ID
   * @returns The greeting message
   */
  async getGreeting(telegramUserId: number) {
    const prompt = await this.promptService.getBotBehaviorPrompt();
    const response = await this.openai.sendMessage([
      {
        role: "system",
        content: prompt,
      },
    ]);
    await this.prisma.message.create({
      data: {
        telegramUserId,
        role: "assistant",
        content: response,
      },
    });
    return response;
  }
}
