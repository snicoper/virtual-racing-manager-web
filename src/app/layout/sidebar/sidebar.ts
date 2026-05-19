import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { LayoutService } from '../layout.service';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

@Component({
  selector: 'vrm-sidebar',
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    MatDivider,
    MatCardModule,
    SidebarMenu,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private layoutService = inject(LayoutService);

  readonly sidebarState = this.layoutService.state.sidebar;
}
