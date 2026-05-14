import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrowserStorageKey } from '../../../core/browser-storage/browser-storage-key.enum';
import { BrowserStorageService } from '../../../core/browser-storage/browser-storage.service';
import { SIDEBAR_MENU } from './sidebar.menu-item';

@Component({
  selector: 'vrm-sidebar-menu',
  imports: [RouterLink, RouterLinkActive, MatExpansionModule, MatIconModule, MatListModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMenu implements OnInit {
  private readonly browserStorageService = inject(BrowserStorageService);

  private openedSections = signal<string[]>([]);

  protected readonly sidebarMenu = SIDEBAR_MENU;

  ngOnInit(): void {
    this.openedSections.set(
      this.browserStorageService.getParsed<string[]>(BrowserStorageKey.SidebarMenu) || [],
    );
  }

  isSectionExpanded(sectionId: string): boolean {
    return this.openedSections().includes(sectionId);
  }

  toggleSection(sectionId: string): void {
    const currentSections = this.openedSections();

    if (currentSections.includes(sectionId)) {
      this.openedSections.set(currentSections.filter((s) => s !== sectionId));

      return;
    }

    this.openedSections.set([...currentSections, sectionId]);

    this.browserStorageService.setObject(BrowserStorageKey.SidebarMenu, this.openedSections());
  }
}
