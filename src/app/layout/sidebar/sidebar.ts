import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { CurrentProfileStateService } from '../../core/states/current-profile/current-profile-state.service';
import { LayoutService } from '../layout.service';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

@Component({
  selector: 'vrm-sidebar',
  imports: [
    RouterLink,
    MatMenuModule,
    MatIcon,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatDivider,
    MatCardModule,
    SidebarMenu,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private layoutService = inject(LayoutService);
  private readonly authService = inject(AuthService);
  private readonly currentProfileStateService = inject(CurrentProfileStateService);

  readonly displayName = computed(
    () => this.currentProfile()?.nickname ?? this.currentUser()?.email ?? 'User',
  );

  protected readonly avatarText = computed(() => this.displayName().slice(0, 1).toUpperCase());

  protected readonly sidebarState = this.layoutService.state.sidebar;
  protected readonly currentUser = this.authService.state.user;
  protected readonly currentProfile = this.currentProfileStateService.state.profile;
}
