import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';

import { AUTH_KEY } from '@/ui/store/auth/auth.key';
import { authReducer } from '@/ui/store/auth/auth.reducer';
import { TASKS_KEY } from '@/ui/store/tasks/tasks.key';
import { tasksReducer } from '@/ui/store/tasks/tasks.reducer';
import { changeLangujeEffect } from '@/ui/store/ui/ui.effects';
import { UI_KEY } from '@/ui/store/ui/ui.key';
import { uiReducer } from '@/ui/store/ui/ui.reducer';
import { USER_KEY } from '@/ui/store/user/user.key';
import { userReducer } from '@/ui/store/user/user.reducer';
import { routes } from './app.routes';
import { AuthGateway } from '@/domain/gateways/auth.gateway';
import { CognitoAuthService } from '@/infraestructure/driven-adapters/cognito-auth.service';
import { provideTranslation } from './translate-loader.config';
import { LogginGateway } from '@/domain/gateways/loggin.gateway';
import { ConsoleLogginService } from '@/infraestructure/driven-adapters/console-loggin.service';
import { GlobalErrorHandler } from '@/infraestructure/driven-adapters/global-error.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    NG_EVENT_PLUGINS,
    NG_EVENT_PLUGINS,

    // Store
    provideStore(),
    provideState({ name: AUTH_KEY, reducer: authReducer }),
    provideState({ name: TASKS_KEY, reducer: tasksReducer }),
    provideState({ name: USER_KEY, reducer: userReducer }),
    provideState({ name: UI_KEY, reducer: uiReducer }),
    provideEffects({ changeLangujeEffect }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),

    // Language
    importProvidersFrom(TranslateModule.forRoot(provideTranslation())),

    // Custom Providers
    {
      provide: AuthGateway, // Patron Adapter usando sistema DI de Anguñar
      useClass: CognitoAuthService, // Implementacion especifica
      deps: [],
    },
    {
      provide: LogginGateway,
      useClass: ConsoleLogginService,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
