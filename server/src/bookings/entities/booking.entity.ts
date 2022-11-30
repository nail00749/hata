import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/baseEntity/base.entity';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { UserEntity } from '../../users/entity/users.entity';
import { BookingStatus } from '../../models';

@Entity({
  name: 'bookings',
})
export class BookingEntity extends BaseEntity {
  @Column({
    name: 'start_date',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
  })
  endDate: Date;

  @Column()
  price: number;

  @Column({ type: 'simple-enum', enum: BookingStatus, default: BookingStatus.REQUEST })
  status: BookingStatus;

  @ManyToOne(() => UserEntity, (user) => user.bookings)
  tenant: UserEntity;

  @ManyToOne(() => ApartmentEntity, (apartment) => apartment.bookings)
  apartment: ApartmentEntity;

}
