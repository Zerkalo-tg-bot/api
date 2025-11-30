import { IOpenAIMessageRole } from "@/services/openai/model";
import { Message } from "@prisma/client";

export interface IMessage extends Message {
  role: IOpenAIMessageRole;
}
