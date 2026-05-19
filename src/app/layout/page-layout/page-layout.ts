import { Component, inject } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'vrm-page-layout',
  imports: [Navbar, Sidebar],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.scss',
})
export class PageLayout {
  private readonly layoutService = inject(LayoutService);

  readonly sidebarState = this.layoutService.state.sidebar;
  readonly navbarState = this.layoutService.state.navbar;
}
