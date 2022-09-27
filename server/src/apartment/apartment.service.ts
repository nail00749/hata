import { Inject, Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Repository } from 'typeorm';
import { ApartmentEntity } from './entities/apartment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApartmentService {
  constructor(@InjectRepository(ApartmentEntity) private readonly apartmentRepository: Repository<ApartmentEntity>) {
  }

  create(createApartmentDto: CreateApartmentDto) {
    return 'This action adds a new apartment';
  }

  findAll() {
    return `This action returns all apartment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apartment`;
  }

  update(id: number, updateApartmentDto: UpdateApartmentDto) {
    return `This action updates a #${id} apartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartment`;
  }
}
