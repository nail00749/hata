import { FastifyRequest } from 'fastify';
import { UserEntity } from '../users/entity/users.entity';

export interface RequestWithUserInterface extends FastifyRequest {
  user: UserEntity
}
