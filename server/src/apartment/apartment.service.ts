import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Repository } from 'typeorm';
import { ApartmentEntity } from './entities/apartment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/users.entity';
import { CurrencyEnum } from 'src/models/Currency.enum';
import { QueryLimitDto } from '../dtos/queryLimit.dto';

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
      images: files.map(file => file.filename),
    };
    await this.apartmentRepository.save(apartment);
    return apartment;
  }

  async findAll(queryLimitDto: QueryLimitDto) {
    const limit = queryLimitDto.limit || 20;
    const skip = queryLimitDto.skip || 0;
    const allCount = await this.apartmentRepository.count();
    const apartments = await this.apartmentRepository.find({
        skip, take: limit,
      },
    );
    return {
      apartments,
      allCount: allCount,
    };
  }

  findOne(id: string) {
    return this.apartmentRepository.findOne({
      where: {
        id,
      },
      relations: {
        bookings: true,
        owner: true
      },
    });
  }

  update(id: number, updateApartmentDto: UpdateApartmentDto) {
    return `This action updates a #${id} apartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartment`;
  }
}
