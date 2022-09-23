import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../baseEntity/base.entity';

@Entity()
export class TokenEntity extends BaseEntity {
  @Column({name: 'refresh_tokens', type: 'simple-array', nullable: true, default: []})
  refreshTokens: string[]
}
