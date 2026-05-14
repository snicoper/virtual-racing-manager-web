import { inject, Injectable, signal } from '@angular/core';
import { BrowserStorageKey } from '../core/browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../core/browser-storage/browser-storage.service';
import { LayoutState } from './layout-state.model';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly browserStorageService = inject(BrowserStorageService);

  private navbarSignal = signal(true);
  private sidebarSignal = signal(true);

  readonly state: LayoutState = {
    navbar: this.navbarSignal.asReadonly(),
    sidebar: this.sidebarSignal.asReadonly(),
  };

  constructor() {
    this.sidebarSignal.set(this.browserStorageService.getParsed(BrowserStorageKey.Sidebar) ?? true);
  }

  toggleNavbar(): void {
    this.navbarSignal.update((value) => !value);
  }

  setNavbarState(value: boolean): void {
    this.navbarSignal.set(value);
  }

  toggleSidebar(): void {
    this.sidebarSignal.update((value) => !value);
    this.browserStorageService.setObject(BrowserStorageKey.Sidebar, this.sidebarSignal());
  }

  setSidebarState(value: boolean): void {
    this.sidebarSignal.set(value);
    this.browserStorageService.setObject(BrowserStorageKey.Sidebar, value);
  }
}
