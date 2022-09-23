import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../baseEntity/base.entity';

@Entity()
export class Role extends BaseEntity{
  @Column()
  name: string;
}
