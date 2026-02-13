import { Module } from "@nestjs/common";
import { GoogleDocsModule } from "@modules/google-docs";
import { PromptService } from "./prompt.service";

@Module({
  imports: [GoogleDocsModule],
  providers: [PromptService],
  exports: [PromptService],
})
export class PromptModule {}
