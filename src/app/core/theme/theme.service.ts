import { inject, Injectable, signal } from '@angular/core';
import { BrowserStorageKey } from '../browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { ThemePreference } from './theme-preference';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly browserStorage = inject<BrowserStorageService>(BrowserStorageService);

  private readonly selectedTheme = signal<ThemePreference>('none');

  readonly theme = this.selectedTheme.asReadonly();

  initialize(): void {
    const storedTheme = this.browserStorage.get(BrowserStorageKey.Theme);
    const theme = this.isThemePreference(storedTheme) ? storedTheme : this.getSystemTheme();

    this.set(theme);
  }

  set(theme: ThemePreference): void {
    this.selectedTheme.set(theme);
    this.browserStorage.set(BrowserStorageKey.Theme, theme);
    this.applyTheme(theme);
  }

  toggle(): void {
    const currentTheme = this.selectedTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.set(nextTheme);
  }

  private applyTheme(theme: ThemePreference): void {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
    document.documentElement.classList.toggle('light-theme', theme === 'light');
  }

  private isThemePreference(value: unknown): value is ThemePreference {
    return ['light', 'dark', 'none'].includes(value as string);
  }

  private getSystemTheme(): ThemePreference {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
