export interface IApartment {
  rentType: string;
  countRooms: number;
  price: number;
  currency: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  }
  description: string;
  images: string[];
  houseArea: number;
  comforts: string[];
  owner?: string;
}

export type IApartmentCreate = Omit<IApartment, 'images'> & {images: FileList | undefined}

