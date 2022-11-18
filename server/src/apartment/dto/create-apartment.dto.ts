import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


class LatLng {
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @Type(() => Number)
  @IsNumber()
  lng: number;
}

export class CreateApartmentDto {
  @IsNotEmpty()
  title: string;

  rentType: string;

  @Type(() => Number)
  @IsInt()
  countRooms: number;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  address: string;

  @Type(() => LatLng)
  coordinates: LatLng;

  description: string;

  /*images: FileList[]*/

  @Type(() => Number)
  @IsNumber()
  houseArea: number;

  comforts: string[];
}
