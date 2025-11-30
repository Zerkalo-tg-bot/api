import { registerAs } from "@nestjs/config";

export default registerAs("prompts", () => ({
  botPromptDocumentId: process.env.BOT_PROMPT_DOCUMENT_ID,
}));
