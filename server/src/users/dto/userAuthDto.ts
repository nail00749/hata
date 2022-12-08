import { IsEmail, MinLength } from 'class-validator';

export class UserAuthDto {
  @IsEmail()
  email: string;

  /*@MinLength(8)*/
  password: string;
}
