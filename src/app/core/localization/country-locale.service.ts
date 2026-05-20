import { Injectable, effect, inject, signal } from '@angular/core';
import countries from 'i18n-iso-countries';
import * as en from 'i18n-iso-countries/langs/en.json';
import * as es from 'i18n-iso-countries/langs/es.json';
import { CountryLocale } from './country-locale.model';
import { LocaleService } from './locale.service';
import { mapLocaleToLibraryFormat } from './localization.utils';

/** Countries from library i18n-iso-countries. */
@Injectable({ providedIn: 'root' })
export class CountryLocaleService {
  private readonly localeService = inject(LocaleService);

  private readonly countryLocales = signal<CountryLocale[]>([]);

  readonly value = this.countryLocales.asReadonly();

  private initialized = false;

  constructor() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    countries.registerLocale(es);
    countries.registerLocale(en);

    // Update countries list whenever the locale changes.
    effect(() => {
      const locale = this.localeService.value();

      if (locale) {
        this.updateCountriesList(mapLocaleToLibraryFormat(locale));
      }
    });
  }

  private updateCountriesList(locale: string): void {
    const countriesObj = countries.getNames(locale);
    const sortedCountries = Object.entries(countriesObj)
      .map(([code, name]) => ({
        code,
        name: name as string,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, locale));

    this.countryLocales.set(sortedCountries);
  }
}
