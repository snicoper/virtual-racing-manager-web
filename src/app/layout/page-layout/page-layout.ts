import { Component, inject } from '@angular/core';
import { Blade } from '../blade/blade';
import { LayoutService } from '../layout.service';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'vrm-page-layout',
  imports: [Navbar, Sidebar, Blade],
  templateUrl: './page-layout.html',
  styleUrl: './page-layout.scss',
})
export class PageLayout {
  private readonly layoutService = inject(LayoutService);

  readonly sidebarState = this.layoutService.state.sidebar;
  readonly navbarState = this.layoutService.state.navbar;
}
