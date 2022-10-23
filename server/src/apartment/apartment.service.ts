import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Repository } from 'typeorm';
import { ApartmentEntity } from './entities/apartment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/users.entity';
import { CurrencyEnum } from 'src/models/Currency.enum';

@Injectable()
export class ApartmentService {
  constructor(@InjectRepository(ApartmentEntity)
              private readonly apartmentRepository: Repository<ApartmentEntity>) {
  }

  async create(createApartmentDto: CreateApartmentDto, user: UserEntity, files: Express.Multer.File[]) {
    let apartment = new ApartmentEntity();
    apartment = {
      ...apartment,
      ...createApartmentDto,
      currency: CurrencyEnum.RUB,
      owner: user,
      images: files.map(file => file.filename)
    };
    await this.apartmentRepository.save(apartment);
    return apartment;
  }

  findAll() {
    return this.apartmentRepository.find({skip: 0, take: 20})
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
