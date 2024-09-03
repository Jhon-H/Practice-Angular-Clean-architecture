import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModuleConfig } from '@ngx-translate/core';
import { Language } from '@/shared/ui/types/language.types';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const provideTranslation = (): TranslateModuleConfig => ({
  defaultLanguage: Language.ES,
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient],
  },
});
