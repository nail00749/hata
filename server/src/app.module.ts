import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entity/users.entity';
import { RolesModule } from './roles/roles.module';
import { TokensModule } from './tokens/tokens.module';
import { TokenEntity } from './tokens/entity/token.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApartmentModule } from './apartment/apartment.module';
import { ApartmentEntity } from './apartment/entities/apartment.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
      entities: [UserEntity, TokenEntity, ApartmentEntity],
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    TokensModule,
    ApartmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
}
