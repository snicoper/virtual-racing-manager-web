import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { BreadcrumbItem } from '../../../../layout/breadcrumb/breadcrumb-item.model';
import { PageHeader } from '../../../../layout/page-header/page-header';
import { PageLayout } from '../../../../layout/page-layout/page-layout';
import { UserProfilesApiService } from '../../services/user-profiles-api.service';

@Component({
  selector: 'vrm-profile',
  imports: [RouterLink, MatCardModule, MatButtonModule, TranslatePipe, PageLayout, PageHeader],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private readonly userProfileApiService = inject(UserProfilesApiService);

  protected loading = false;
  protected readonly siteUrls = SiteUrls;
  protected readonly breadcrumbItems = this.buildBreadcrumbItems();

  ngOnInit(): void {
    this.getProfile();
  }

  private buildBreadcrumbItems(): BreadcrumbItem[] {
    return [
      {
        label: 'userProfiles.profile.title',
        icon: 'person',
      },
    ];
  }

  private getProfile(): void {
    this.loading = true;
    this.userProfileApiService
      .me()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          // TODO
        },
      });
  }
}
