import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { FactService } from "./fact.service";
import { CreateFactDto } from "./dto/create-fact.dto";
import { UpdateFactDto } from "./dto/update-fact.dto";

@Controller(":telegramUserId/facts")
export class FactController {
  constructor(private readonly factService: FactService) {}

  @Post()
  create(@Param("telegramUserId") telegramUserId: string, @Body() createFactDto: CreateFactDto) {
    return this.factService.create(+telegramUserId, createFactDto);
  }

  @Get()
  findAll(@Param("telegramUserId") telegramUserId: string) {
    return this.factService.findAll(+telegramUserId);
  }

  @Get(":id")
  findOne(@Param("telegramUserId") telegramUserId: string, @Param("id") id: string) {
    return this.factService.findOne(+telegramUserId, +id);
  }

  @Patch(":id")
  update(@Param("telegramUserId") telegramUserId: string, @Param("id") id: string, @Body() updateFactDto: UpdateFactDto) {
    return this.factService.update(+telegramUserId, +id, updateFactDto);
  }

  @Delete(":id")
  remove(@Param("telegramUserId") telegramUserId: string, @Param("id") id: string) {
    return this.factService.remove(+telegramUserId, +id);
  }
}
