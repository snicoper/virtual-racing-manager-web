import { inject, Injectable } from '@angular/core';
import { logError, logInfo } from '../errors/logger/logger';
import { DateAdapterService } from '../localization/date-adapter.service';
import { LocaleService } from '../localization/locale.service';
import { LuxonDateTimeService } from '../localization/luxon-date-time.service';
import { TimeZoneService } from '../localization/time-zone.service';
import { ThemeService } from '../theme/theme.service';

/** Configuración inicial de la aplicación. */
@Injectable({ providedIn: 'root' })
export class AppInitializer {
  private readonly localeService = inject(LocaleService);
  private readonly timeZoneService = inject(TimeZoneService);
  private readonly luxonDateTimeService = inject(LuxonDateTimeService);
  private readonly dateAdapterService = inject(DateAdapterService);
  private readonly themeService = inject(ThemeService);

  async load(): Promise<void> {
    try {
      this.localeService.initialize();
      this.timeZoneService.initialize();
      this.luxonDateTimeService.initialize();
      this.dateAdapterService.initialize();
      this.themeService.initialize();

      logInfo('AppInitializer.load', 'Application initialized successfully');
    } catch (error) {
      logError('AppInitializer.load', 'Error initializing application', error);
      throw error;
    }
  }
}
