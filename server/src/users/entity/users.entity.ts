import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { BaseEntity } from '../../database/baseEntity/base.entity';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';


@Entity({
  name: 'users'
})
export class UserEntity extends BaseEntity {
  @Column({unique: true})
  email: string

  @Column({name: 'is_active', default: false})
  isActive: boolean

  @Column()
  password: string

  @Column({name: 'first_name', nullable: true})
  firstName: string

  @Column({name: 'last_name', nullable: true})
  lastName: string

  @OneToMany(() => ApartmentEntity, apartment => apartment.owner)
  apartments: ApartmentEntity[]

  @Column({name: 'refresh_tokens', type: 'simple-array', default: []})
  refreshTokens: string[]

  @OneToMany(() => BookingEntity, (booking) => booking.tenant)
  bookings: BookingEntity[]

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date

  @VersionColumn()
  version: number
}
