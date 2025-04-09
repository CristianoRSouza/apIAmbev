import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PoHttpRequestModule, PoI18nConfig, PoI18nModule } from '@po-ui/ng-components';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { generalEn } from './i18n/general-en';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TokenProviderInterceptor } from './core/interceptors/token-provider.interceptor';
import { UnauthorizedInterceptor } from './core/interceptors/unauthorized.interceptor';
import { PoStorageModule } from '@po-ui/ng-storage';

const i18nConfig: PoI18nConfig = {
  default: {
    language: 'en-en',
    context: 'general',
    cache: true
  },
  contexts: {
    general: {
      'en-en': generalEn
    },
    hcm: {
      url: 'http://10.1.1.1/api/translations/hcm/'
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([PoHttpRequestModule, PoStorageModule.forRoot(), PoI18nModule.config(i18nConfig)]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenProviderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }, provideAnimationsAsync(),
  ],
};
