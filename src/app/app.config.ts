import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { AppInitializer } from './core/config/app-initializer';
import { CustomErrorHandler } from './core/errors/custom-error-handler';
import { apiErrorInterceptor } from './core/http/api-error.interceptor';
import { apiInterceptor } from './core/http/api.interceptor';
import { authRefreshInterceptor } from './core/http/auth-refresh.interceptor';
import { TitleStrategyService } from './core/seo/title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => inject(AppInitializer).load()),
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
    provideLuxonDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES',
    },

    { provide: TitleStrategy, useClass: TitleStrategyService },

    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([apiInterceptor, authRefreshInterceptor, apiErrorInterceptor]),
    ),

    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
