import { ApplicationConfig } from '@angular/core';
// import { appProviders } from './app.providers';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { routes } from './app.routes';

import { AUTH_KEY } from '@/store/auth/auth.key';
import { authReducer } from '@/store/auth/auth.reducer';
import { TASKS_KEY } from '@/store/tasks/tasks.key';
import { tasksReducer } from '@/store/tasks/tasks.reducer';
import { changeLangujeEffect } from '@/store/ui/ui.effects';
import { UI_KEY } from '@/store/ui/ui.key';
import { uiReducer } from '@/store/ui/ui.reducer';
import { USER_KEY } from '@/store/user/user.key';
import { userReducer } from '@/store/user/user.reducer';

import { provideTranslation } from '@/core/config/translate-loader.config';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGateway } from './core/providers/auth/auth.gateway';
import { CognitoAuthService } from './core/providers/auth/cognito-auth.service';
// import { CognitoAuthService } from './shared/services/auth/cognito-auth.service';

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

    // Auth
    {
      provide: AuthGateway, // Patron Adapter usando sistema DI de Anguñar
      useClass: CognitoAuthService, // Implementacion especifica
      deps: [],
    },
  ],
};
