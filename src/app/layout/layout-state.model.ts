import { Signal } from '@angular/core';

export interface LayoutState {
  navbar: Signal<boolean>;
  sidebar: Signal<boolean>;
}
