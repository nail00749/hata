import { BaseEntity } from './base.entity';
import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class BaseWithMetadataEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
