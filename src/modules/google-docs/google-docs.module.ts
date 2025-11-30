import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { GoogleDocsService } from "./google-docs.service";

@Module({
  imports: [HttpModule],
  providers: [GoogleDocsService],
  exports: [GoogleDocsService],
})
export class GoogleDocsModule {}
