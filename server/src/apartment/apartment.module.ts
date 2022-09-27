import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentEntity } from './entities/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApartmentEntity]),
  ],
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [],
})
export class ApartmentModule {
}
