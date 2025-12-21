import { Module } from "@nestjs/common";
import { FactService } from "./fact.service";
import { FactController } from "./fact.controller";
import { PrismaModule } from "@/modules/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FactController],
  providers: [FactService],
})
export class FactModule {}
