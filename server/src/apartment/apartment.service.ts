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

  create(createApartmentDto: CreateApartmentDto, user: any) {
    const apartment = new ApartmentEntity()
    apartment.coordinates = createApartmentDto.coordinates
    apartment.countRooms = createApartmentDto.countRooms
    apartment.rentType = createApartmentDto.rentType
    apartment.price = createApartmentDto.price
    apartment.address = createApartmentDto.address
    apartment.description = createApartmentDto.description
    apartment.houseArea = createApartmentDto.houseArea
    apartment.comforts = createApartmentDto.comforts
    apartment.owner = user
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
