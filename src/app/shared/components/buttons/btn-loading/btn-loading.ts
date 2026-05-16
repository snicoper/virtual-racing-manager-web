import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BtnType } from './btn.type';

@Component({
  selector: 'vrm-btn-loading',
  imports: [NgClass, MatProgressSpinner, MatButtonModule, MatIcon],
  templateUrl: './btn-loading.html',
  styleUrl: './btn-loading.scss',
})
export class BtnLoading {
  readonly isLoading = input.required<boolean>();
  readonly btnText = input.required<string>();
  readonly btnTextLoading = input('loading...');

  readonly color = input('primary');
  readonly icon = input<string>();
  readonly spinnerColor = input('warn');
  readonly btnType = input(BtnType.submit);
  readonly styles = input('');
  readonly disabled = input(false);

  readonly eventClick = output<void>();

  handleClick(): void {
    if (this.disabled() || this.isLoading()) {
      return;
    }

    this.eventClick.emit();
  }
}
