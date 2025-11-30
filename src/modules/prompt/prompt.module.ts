import { Module } from "@nestjs/common";
import { GoogleDocsModule } from "../google-docs/google-docs.module";
import { PromptService } from "./prompt.service";

@Module({
  imports: [GoogleDocsModule],
  providers: [PromptService],
  exports: [PromptService],
})
export class PromptModule {}
