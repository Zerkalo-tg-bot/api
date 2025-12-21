import { Injectable } from "@nestjs/common";
import { CreateFactDto } from "./dto/create-fact.dto";
import { UpdateFactDto } from "./dto/update-fact.dto";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { Fact } from "@prisma/client";

@Injectable()
export class FactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(telegramUserId: number, createFactDto: CreateFactDto) {
    const fact: Fact = await this.prisma.fact.create({
      data: {
        telegramUserId: telegramUserId,
        content: createFactDto.content,
      },
    });

    return fact;
  }

  async findAll(telegramUserId: number) {
    const facts: Fact[] = await this.prisma.fact.findMany({
      where: {
        telegramUserId: telegramUserId,
      },
    });

    return facts;
  }

  async findOne(telegramUserId: number, id: number) {
    const fact: Fact | null = await this.prisma.fact.findFirst({
      where: {
        id: id,
        telegramUserId: telegramUserId,
      },
    });
  }

  update(telegramUserId: number, id: number, updateFactDto: UpdateFactDto) {
    const updatedFact = this.prisma.fact.update({
      where: { id: id },
      data: {
        content: updateFactDto.content,
      },
    });
    return updatedFact;
  }

  remove(telegramUserId: number, id: number) {
    return this.prisma.fact.delete({
      where: { id: id },
    });
  }
}
