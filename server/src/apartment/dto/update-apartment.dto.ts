import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateApartmentDto {
  @IsOptional()
  title: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  description: string;

  @IsOptional()
  comforts: string[];
}
