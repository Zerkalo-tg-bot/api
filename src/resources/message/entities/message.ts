import { IOpenAIMessageRole } from "@/modules/openai";
import { Message } from "@prisma/client";

export interface IMessage extends Message {
  role: IOpenAIMessageRole;
}
