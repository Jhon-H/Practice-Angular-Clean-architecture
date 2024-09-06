import { Mapper } from '@/base/mapper';
import { User } from '@/domain/entities/user.entity';
import { Role } from '@/domain/value-objects/role.vo';
import { RoleEnum, RoleViewModel, UserViewModel } from '@/infraestructure/models/user.model';

export class UserMapper implements Mapper<User, UserViewModel> {
  mapTo({ name, email, picture, role }: UserViewModel): User {
    return new User({ name, email, picture, role: Role.create(role) });
  }

  mapFrom(params: User): UserViewModel {
    const userRole = params.role.getValue();
    let userModelRole: RoleViewModel = 'UNKNOWN';

    if (userRole === RoleEnum.ADMIN) userModelRole = RoleEnum.ADMIN;
    if (userRole === RoleEnum.USER) userModelRole = RoleEnum.USER;

    return {
      name: params.name,
      email: params.email,
      picture: params.picture,
      role: userModelRole,
    };
  }
}
