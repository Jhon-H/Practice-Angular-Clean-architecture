import { FetchUserAttributesOutput } from 'aws-amplify/auth';
import { User } from '../models/user.model';
import { Mapper } from './base.mapper';
import { RoleEnum } from '../types';

export class FetchUserAttributesMapper implements Mapper<User, FetchUserAttributesOutput> {
  mapFrom(value: FetchUserAttributesOutput): User {
    return {
      email: value.email ?? '',
      name: value.name ?? '',
      picture: value.picture ?? '',
      role: value.email?.includes('admin-x') ? RoleEnum.ADMIN : RoleEnum.USER,
    };
  }
}
