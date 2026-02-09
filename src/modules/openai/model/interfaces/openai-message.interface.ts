import { EOpenAIMessageRole } from "./openai-message-role.enum";

export interface IOpenAIMessage {
  role: EOpenAIMessageRole;
  content: string;
}
