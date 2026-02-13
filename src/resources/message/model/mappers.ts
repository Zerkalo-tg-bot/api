import { EOpenAIMessageRole, IOpenAIMessage } from "@modules/openai";
import { Message, MessageRole } from "@prisma/client";

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

export function mapMessageToOpenAIMessage(message: Message): IOpenAIMessage {
  return {
    role: mapMessageRoleToOpenAI(message.role),
    content: message.content,
  };
}
