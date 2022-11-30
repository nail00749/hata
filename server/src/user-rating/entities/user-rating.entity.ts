import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { BaseWithMetadataEntity } from '../../database/baseEntity/baseWithMetadata.entity';
import { UserEntity } from '../../users/entity/users.entity';

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

  @OneToMany(() => ApartmentEntity, (apartment) => apartment.ratings)
  apartment: ApartmentEntity;
}
