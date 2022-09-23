import {UserEntity} from './entity/users.entity';

export class UserModel {
  constructor(UserEntity: UserEntity) {
    this.email = UserEntity.email
  }

  private email: string
  private lastName: string
  private firstName: string

}
