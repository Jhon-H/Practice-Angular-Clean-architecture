import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk/classes';
import { TuiButton, TuiError } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { COMPLETE_ROUTES } from '@/ui/helpers/constants/routes';
import { LayoutComponent } from '@/ui/ds/components/templates/layout/layout.component';
import { AuthFacade } from '@/ui/shared/services/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiButton,
    RouterLink,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly registerPath = COMPLETE_ROUTES.Register;

  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  showIncorrectPasswordOrUsername = signal(false);

  readonly authForm = this.fb.group({
    username: this.fb.control('jhonTest', [Validators.required]),
    password: this.fb.control('password@12A', [Validators.required, Validators.minLength(8)]),
  });

  submit() {
    if (this.isFormInvalid()) return;
    this.showIncorrectPasswordOrUsername.set(false);

    const username = this.authForm.value.username!;
    const password = this.authForm.value.password!;

    this.authFacade.login({ username, password }).subscribe(
      isSuccessLogin => {
        if (isSuccessLogin) {
          return this.router.navigate([COMPLETE_ROUTES.Tasks], {
            replaceUrl: true,
          });
        }

        return this.showIncorrectPasswordOrUsername.set(true);
      },
      () => {
        this.showIncorrectPasswordOrUsername.set(true);
      }
    );
  }

  isFormInvalid(): boolean {
    return this.authForm.invalid;
  }

  get computedError() {
    return this.showIncorrectPasswordOrUsername()
      ? new TuiValidationError('Usuario o contraseña incorrectos')
      : null;
  }
}
