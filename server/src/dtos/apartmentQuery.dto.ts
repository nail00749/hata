import { QueryLimitDto } from './queryLimit.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ApartmentQueryDto extends QueryLimitDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice: number;
}
