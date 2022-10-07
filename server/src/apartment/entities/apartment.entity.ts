import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../baseEntity/base.entity';
import { UserEntity } from '../../users/entity/users.entity';

export enum Currency {
  RUB = 'rub',
  USD = 'usd',
  EUR = 'eur'
}

@Entity()
export class ApartmentEntity extends BaseEntity {
  @Column()
  rentType: string;

  @Column({ name: 'count_rooms', default: 1 })
  countRooms: number;

  @Column({ default: 1 })
  price: number;

  @Column({ type: 'enum', enum: Currency, default: Currency.RUB })
  currency: string;

  @Column()
  address: string;

  @Column({ type: 'simple-json' })
  coordinates: { lat: number, lng: number };

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'simple-array', default: [] })
  images: string[];

  @Column({ name: 'house_area', nullable: true })
  houseArea: number;

  @Column({ type: 'simple-array', nullable: true })
  comforts: string[];

  @ManyToOne(() => UserEntity, user => user.apartments)
  owner: UserEntity;
}
