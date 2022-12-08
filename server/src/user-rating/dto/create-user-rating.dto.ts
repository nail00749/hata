import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class CreateUserRatingDto {
  booking: string;

  @IsInt()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating: number;

  comment: string;

}
