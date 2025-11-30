import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { OpenaiService } from "./openai.service";

@Module({
  imports: [HttpModule],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
