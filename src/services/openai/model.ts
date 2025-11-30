export interface IOpenAIMessage {
  role: IOpenAIMessageRole;
  content: string;
}

export type IOpenAIMessageRole = "user" | "assistant" | "system";
