import { IsNumber, IsOptional } from 'class-validator';

export class QueryLimitDto {
  @IsOptional()
  @IsNumber()
  limit: number

  @IsOptional()
  @IsNumber()
  skip: number
}
