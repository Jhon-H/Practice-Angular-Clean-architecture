import { FetchUserAttributesOutput } from 'aws-amplify/auth';
import { Mapper } from '@/base/mapper';
import { User } from '@/domain/entities/user.entity';
import { Role, RoleType } from '@/domain/value-objects/role.vo';

//* Patron Adapter + Factory

export class UserToFetchUserAttributesMapper implements Mapper<User, FetchUserAttributesOutput> {
  mapTo({ name, email, picture }: FetchUserAttributesOutput): User {
    return new User({ name, email, picture, role: Role.create(RoleType.USER) });
  }
}
