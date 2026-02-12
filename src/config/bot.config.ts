import { registerAs } from "@nestjs/config";

export default registerAs("bot", () => ({
  disclaimerDocumentId: process.env.BOT_DISCLAIMER_DOCUMENT_ID,
}));
