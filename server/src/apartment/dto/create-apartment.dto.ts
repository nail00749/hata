import { IsLatLong, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateApartmentDto {
  @IsNotEmpty()
  title: string

  rentType: string;

  @IsNumber()
  countRooms: number;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  address: string;

  @IsLatLong()
  coordinates: {
    lat: number;
    lng: number
  };

  description: string;

  /*images: FileList[]*/

  houseArea: number;

  comforts: string[]
}
