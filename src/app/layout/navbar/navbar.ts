import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { AppEnvironment } from '../../core/config/app-environment';
import { SiteUrls } from '../../core/navigation/site-urls';
import { CurrentProfileStateService } from '../../core/states/current-profile/current-profile-state.service';
import { ThemeService } from '../../core/theme/theme.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'vrm-navbar',
  imports: [
    RouterLink,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDivider,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly layoutService = inject(LayoutService);
  private readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);
  private readonly currentProfileStateService = inject(CurrentProfileStateService);

  readonly displayName = computed(
    () => this.currentProfile()?.nickname ?? this.currentUser()?.email ?? 'User',
  );

  readonly avatarText = computed(() => this.displayName().slice(0, 1).toUpperCase());

  protected readonly currentUser = this.authService.state.user;
  protected readonly currentProfile = this.currentProfileStateService.state.profile;
  protected readonly sidebarState = this.layoutService.state.sidebar;
  protected readonly appName = AppEnvironment.SiteName;
  protected readonly theme = this.themeService.theme;
  protected readonly siteUrls = SiteUrls;

  handleLogout(): void {
    this.authService.logout();
  }

  handleToggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  handleToggleTheme(): void {
    this.themeService.toggle();
  }
}
