import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseWithMetadataEntity } from '../../database/baseEntity/baseWithMetadata.entity';
import { UserEntity } from '../../users/entity/users.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';

@Entity({
  name: 'user_ratings',
})
export class UserRatingEntity extends BaseWithMetadataEntity {
  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user)
  user: UserEntity;

  @ManyToOne(() => BookingEntity, (booking) => booking.ratings)
  booking: BookingEntity;
}
