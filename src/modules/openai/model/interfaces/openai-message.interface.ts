import { IOpenAIMessageRole } from "./openai-message-role.interface";

export interface IOpenAIMessage {
  role: IOpenAIMessageRole;
  content: string;
}
