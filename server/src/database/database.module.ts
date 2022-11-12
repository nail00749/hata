import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApartmentEntity } from '../apartment/entities/apartment.entity';
import { UserEntity } from '../users/entity/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: ['error'],
      autoLoadEntities: true,
      entities: [UserEntity, ApartmentEntity],
    }),
  ],
})
export class DatabaseModule {
}
