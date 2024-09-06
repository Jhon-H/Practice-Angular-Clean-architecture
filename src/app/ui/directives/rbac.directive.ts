import { Directive, inject, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { RbacService } from '@/ui/shared/services/rbac/rbac.service';
import { RoleViewModel } from '@/infraestructure/models/user.model';

@Directive({
  selector: '[appRbca]',
  standalone: true,
})
export class RbacDirective implements OnInit {
  private readonly rbacService = inject(RbacService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);

  user = input<any>();
  allowedRole = input.required<RoleViewModel>();

  ngOnInit() {
    this.viewContainer.clear();

    this.rbacService.isGranted([this.allowedRole()], this.user()).subscribe(isGranted => {
      if (isGranted) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
