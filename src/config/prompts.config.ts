import { registerAs } from "@nestjs/config";

export default registerAs("prompts", () => ({
  botPromptDocumentId: process.env.BOT_PROMPT_DOCUMENT_ID,
  botMessageToolsDocumentId: process.env.BOT_MESSAGE_TOOLS_DOCUMENT_ID,
}));
