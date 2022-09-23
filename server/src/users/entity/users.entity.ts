import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn, VersionColumn } from 'typeorm';
import { BaseEntity } from '../../baseEntity/base.entity';
import { Exclude } from 'class-transformer';
import { TokenEntity } from '../../tokens/entity/token.entity';

@Entity()
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

  @OneToOne(() => TokenEntity)
  @JoinColumn()
  tokenEntity: TokenEntity

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date

  @VersionColumn()
  version: number
}
