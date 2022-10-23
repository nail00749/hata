import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../baseEntity/base.entity';
import { UserEntity } from '../../users/entity/users.entity';
import { CurrencyEnum } from '../../models/Currency.enum';

@Entity({
  name: 'apartments'
})
export class ApartmentEntity extends BaseEntity {
  @Column()
  rentType: string;

  @Column({ name: 'count_rooms', default: 1 })
  countRooms: number;

  @Column({ default: 1 })
  price: number;

  @Column({ type: 'enum', enum: CurrencyEnum, default: CurrencyEnum.RUB })
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
