import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { RbacService } from '@/ui/shared/services/rbac/rbac.service';

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
