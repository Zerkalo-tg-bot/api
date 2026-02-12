import { EOpenAIMessageRole } from "../enums";

export interface IOpenAIMessage {
  role: EOpenAIMessageRole;
  content: string;
}
