import { Injectable } from '@nestjs/common';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';

@Injectable()
export class FactService {
  create(createFactDto: CreateFactDto) {
    return 'This action adds a new fact';
  }

  findAll() {
    return `This action returns all fact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fact`;
  }

  update(id: number, updateFactDto: UpdateFactDto) {
    return `This action updates a #${id} fact`;
  }

  remove(id: number) {
    return `This action removes a #${id} fact`;
  }
}
