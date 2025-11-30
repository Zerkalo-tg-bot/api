import { IOpenAIMessage } from "@/modules/openai/model";
import { IMessage } from "../entities/message";

export function mapMessageToOpenAIMessage(message: IMessage): IOpenAIMessage {
  return {
    role: message.role,
    content: message.content,
  };
}
