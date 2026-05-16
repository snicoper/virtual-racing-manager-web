import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'vrm-btn-back',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './btn-back.html',
})
export class BtnBack {
  private readonly location = inject(Location);

  readonly color = input('accent');
  readonly icon = input('arrow_back_ios');
  readonly text = input('Volver');

  handleClick(): void {
    this.location.back();
  }
}
