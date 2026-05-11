import { Component, inject } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'vrm-root',
  imports: [RouterOutlet, MatSlideToggle],
  templateUrl: './app.html',
})
export class App {
  private readonly themeService = inject<ThemeService>(ThemeService);

  handleDarkModeToggle(): void {
    this.themeService.toggle();
  }
}
