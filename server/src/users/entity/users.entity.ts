import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';
import { classToPlain, Exclude } from 'class-transformer';
import { BaseWithMetadataEntity } from '../../database/baseEntity/baseWithMetadata.entity';


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
  activationLink: string;

  @Column({ name: 'refresh_tokens', type: 'simple-array', default: [] })
  @Exclude({ toPlainOnly: true })
  refreshTokens: string[];

  @OneToMany(() => BookingEntity, (booking) => booking.tenant)
  bookings: BookingEntity[];


  toJSON() {
    return classToPlain(this);
  }
}
