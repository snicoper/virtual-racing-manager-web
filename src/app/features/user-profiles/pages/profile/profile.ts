import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { CurrentProfileStateService } from '../../../../core/states/current-profile/current-profile-state.service';
import { BreadcrumbItem } from '../../../../layout/breadcrumb/breadcrumb-item.model';
import { PageHeader } from '../../../../layout/page-header/page-header';
import { PageLayout } from '../../../../layout/page-layout/page-layout';

@Component({
  selector: 'vrm-profile',
  imports: [RouterLink, MatCardModule, MatButtonModule, TranslatePipe, PageLayout, PageHeader],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly currentProfileStateService = inject(CurrentProfileStateService);

  protected loading = false;
  protected readonly siteUrls = SiteUrls;
  protected readonly breadcrumbItems = this.buildBreadcrumbItems();

  protected hasProfile(): boolean {
    return this.currentProfileStateService.state.hasProfile();
  }

  private buildBreadcrumbItems(): BreadcrumbItem[] {
    return [
      {
        label: 'userProfiles.profile.title',
        icon: 'person',
      },
    ];
  }
}
