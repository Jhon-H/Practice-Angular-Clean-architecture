import { COMPLETE_ROUTES } from '@/shared/domain/routes';
import { RoleEnum } from '@/shared/domain/types';
import { RbacService } from '@/shared/services/rbac/rbac.service';
import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateChildFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const rbacService = inject(RbacService);
  const allowedRoles = childRoute.data['allowedRoles'] ?? [];
  const notGrantedRedirectTo = childRoute.data['notGrantedRedirectTo'] ?? '';

  return rbacService.isGranted(allowedRoles).pipe(
    map(isGranted => {
      return isGranted || router.createUrlTree([notGrantedRedirectTo]);
    })
  );
};
