import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Zerkalo API Documentation")
  .setDescription("Zerkalo API Documentation")
  .setVersion("1.0.0")
  .addTag("chat", "Chat operations")
  .addTag("message", "Message operations")
  .build();
