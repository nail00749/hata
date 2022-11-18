import { IsPhoneNumber, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(2)
  firstName: string

  @MinLength(2)
  lastName: string

  @IsPhoneNumber('RU')
  phone: string
}
