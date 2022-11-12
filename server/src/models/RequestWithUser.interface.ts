import { FastifyRequest } from 'fastify';
import { UserEntity } from '../users/entity/users.entity';

export interface RequestWithUser extends FastifyRequest {
  user: UserEntity
}
