import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppEnvironment } from '../../core/config/app-environment';
import { ThemeService } from '../../core/theme/theme.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'vrm-navbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly layoutService = inject(LayoutService);
  private readonly themeService = inject(ThemeService);

  protected readonly appName = AppEnvironment.SiteName;
  protected readonly theme = this.themeService.theme;
  protected readonly sidebarState = this.layoutService.state.sidebar;

  handleToggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  handleToggleTheme(): void {
    this.themeService.toggle();
  }
}
