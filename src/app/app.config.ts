import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLuxonDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES',
    },

    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
