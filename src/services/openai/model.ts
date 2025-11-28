export interface IOpenAIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}
