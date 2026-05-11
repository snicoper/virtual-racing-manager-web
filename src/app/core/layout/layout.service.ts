import { Injectable, signal } from '@angular/core';
import { LayoutState } from './layout-state.model';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private navbarSignal = signal(true);
  private sidebarSignal = signal(true);
  private footerSignal = signal(true);

  readonly layoutState: LayoutState = {
    navbar: this.navbarSignal.asReadonly(),
    sidebar: this.sidebarSignal.asReadonly(),
    footer: this.footerSignal.asReadonly(),
  };

  navbarToggle(): void {
    this.navbarSignal.update((value) => !value);
  }

  navbarSetState(value: boolean): void {
    this.navbarSignal.set(value);
  }

  sidebarToggle(): void {
    this.sidebarSignal.update((value) => !value);
  }

  sidebarSetState(value: boolean): void {
    this.sidebarSignal.set(value);
  }

  footerToggle(): void {
    this.footerSignal.update((value) => !value);
  }

  footerSetState(value: boolean): void {
    this.footerSignal.set(value);
  }
}
