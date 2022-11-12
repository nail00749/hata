import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/baseEntity/base.entity';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { UserEntity } from '../../users/entity/users.entity';


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

  @OneToOne(() => UserEntity)
  @JoinColumn()
  tenant: UserEntity;

  @ManyToOne(() => ApartmentEntity, (apartment) => apartment.bookings)
  apartment: ApartmentEntity;

}
