import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FactService } from './fact.service';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';

@Controller('fact')
export class FactController {
  constructor(private readonly factService: FactService) {}

  @Post()
  create(@Body() createFactDto: CreateFactDto) {
    return this.factService.create(createFactDto);
  }

  @Get()
  findAll() {
    return this.factService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactDto: UpdateFactDto) {
    return this.factService.update(+id, updateFactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factService.remove(+id);
  }
}
