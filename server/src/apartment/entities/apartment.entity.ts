import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/baseEntity/base.entity';
import { UserEntity } from '../../users/entity/users.entity';
import { CurrencyEnum } from '../../models';
import { BookingEntity } from '../../bookings/entities/booking.entity';
import { UserRatingEntity } from '../../user-rating/entities/user-rating.entity';

@Entity({
  name: 'apartments',
})
export class ApartmentEntity extends BaseEntity {
  @Column()
  rentType: string;

  @Column({ name: 'title', default: 'some title' })
  title: string;

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

  @OneToMany(() => BookingEntity, (booking) => booking.apartment)
  bookings: BookingEntity[];

  @ManyToOne(() => UserRatingEntity, (rating) => rating.apartment)
  ratings: UserRatingEntity[]
}
