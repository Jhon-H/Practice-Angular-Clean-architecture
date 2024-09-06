import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk/classes';
import { TuiButton, TuiError } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import { LayoutComponent } from '@/ui/ds/components/templates/layout/layout.component';
import { COMPLETE_ROUTES } from '@/ui/helpers/constants/routes';
import { AuthFacade } from '@/ui/shared/services/auth.facade';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly loginPath = COMPLETE_ROUTES.Login;

  private readonly fb = inject(FormBuilder);
  private readonly authFacade = inject(AuthFacade);

  isLoading = signal(false);
  isSuccessRegister = signal(false);
  showIncorrectPasswordOrUsername = signal(false);
  incorrectPasswordValidation = signal(false);

  readonly authForm = this.fb.group({
    username: this.fb.control('jhonTest', [Validators.required]),
    email: this.fb.control('jhon@test.com', [Validators.required, Validators.email]),
    // password: this.fb.control('password@12A', [Validators.required, Validators.minLength(8)]),
    password: this.fb.control('password@12A', [Validators.required]),
    picture: this.fb.control('https://my-image.png', [
      Validators.required,
      Validators.pattern(/https:\/\/*/),
    ]),
    name: this.fb.control('Jhon Hernandez', [Validators.required, Validators.minLength(3)]),
  });

  submit() {
    const { username, email, password, picture, name } = this.authForm.value;

    if (this.isFormInvalid()) return;
    if (!username || !email || !password || !picture || !name) return;

    this.isLoading.set(true);
    this.showIncorrectPasswordOrUsername.set(false);

    this.authFacade.register({ username, email, password, picture, name }).subscribe(
      isSuccessRegister => {
        this.isLoading.set(false);
        this.showIncorrectPasswordOrUsername.set(!isSuccessRegister);
        this.isSuccessRegister.set(isSuccessRegister);
        //* Error de negocio si es false --> OJO, pueden haber falsos negativos
        this.incorrectPasswordValidation.set(!isSuccessRegister);
      },
      () => {
        this.isLoading.set(false);
      }
    );
  }

  isFormInvalid(): boolean {
    return this.authForm.invalid;
  }

  get computedError() {
    return this.showIncorrectPasswordOrUsername()
      ? new TuiValidationError('Error al crear usuario')
      : null;
  }
}
