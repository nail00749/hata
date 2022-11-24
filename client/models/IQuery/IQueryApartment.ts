import { IQueryBase } from './IQueryBase';

export interface IQueryApartment extends IQueryBase {
  minPrice?: number;
  maxPrice?: number;
}
