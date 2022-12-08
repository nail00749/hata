import {
  Column,
  Entity, ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { BaseWithMetadataEntity } from '../../database/baseEntity/baseWithMetadata.entity';
import { UserRatingEntity } from '../../user-rating/entities/user-rating.entity';


@Entity({
  name: 'users',
})
export class UserEntity extends BaseWithMetadataEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => ApartmentEntity, apartment => apartment.owner)
  apartments: ApartmentEntity[];

  @Column({ name: 'activation_link', nullable: true })
  @Exclude({ toPlainOnly: true })
  activationLink: string;

  @Column({ name: 'refresh_token', /*type: 'simple-array', default: []*/ nullable: true })
  @Exclude({ toPlainOnly: true })
  refreshToken: string;

  @OneToMany(() => BookingEntity, (booking) => booking.tenant)
  bookings: BookingEntity[];

  @OneToMany(() => UserRatingEntity, (rating) => rating.user)
  ratings: UserRatingEntity[];


  toJSON() {
    return classToPlain(this);
  }
}
