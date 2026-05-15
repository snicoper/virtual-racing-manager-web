import { Component, computed, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AlertType } from './alert.type';

@Component({
  selector: 'vrm-alert',
  imports: [MatIcon],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  type = input.required<AlertType>();
  message = input.required<string>();
  dismissible = input(true);
  icon = input(false);

  protected readonly dismissed = signal(false);

  protected readonly visible = computed(() => !this.dismissed());

  protected readonly resolvedIcon = computed(() => {
    if (!this.icon()) {
      return null;
    }

    switch (this.type()) {
      case 'success':
        return 'check_circle_outline';

      case 'info':
        return 'info_outline';

      case 'warning':
        return 'warning_amber';

      case 'error':
        return 'error_outline';
    }
  });

  protected readonly resolvedAlertClass = computed(() => `alert alert-${this.type()}`);

  protected dismiss(): void {
    this.dismissed.set(true);
  }
}
