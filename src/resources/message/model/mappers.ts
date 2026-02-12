import { IOpenAIMessage } from "@/modules/openai";
import { EOpenAIMessageRole } from "@/modules/openai";
import { MessageRole } from "@prisma/client";
import { IMessage } from "../entities/message";

function mapMessageRoleToOpenAI(role: MessageRole): EOpenAIMessageRole {
  switch (role) {
    case MessageRole.SYSTEM:
      return EOpenAIMessageRole.SYSTEM;
    case MessageRole.USER:
      return EOpenAIMessageRole.USER;
    case MessageRole.ASSISTANT:
      return EOpenAIMessageRole.ASSISTANT;
  }
}

export function mapMessageToOpenAIMessage(message: IMessage): IOpenAIMessage {
  return {
    role: mapMessageRoleToOpenAI(message.role),
    content: message.content,
  };
}
