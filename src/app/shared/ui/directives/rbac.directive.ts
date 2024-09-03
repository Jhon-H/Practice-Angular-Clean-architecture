import { Role } from '@/shared/domain/models/role.model';
import { RbacService } from '@/shared/services/rbac/rbac.service';
import {
  Directive,
  inject,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appRbca]',
  standalone: true,
})
export class RbacDirective implements OnInit {
  private readonly rbacService = inject(RbacService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);

  user = input<any>();
  allowedRole = input.required<Role>();

  ngOnInit() {
    this.viewContainer.clear();

    this.rbacService
      .isGranted([this.allowedRole()], this.user())
      .subscribe(isGranted => {
        if (isGranted) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
  }
}
