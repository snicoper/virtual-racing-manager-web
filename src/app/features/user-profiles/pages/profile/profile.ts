import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { CurrentProfileStateService } from '../../../../core/states/current-profile/current-profile-state.service';
import { BreadcrumbItem } from '../../../../layout/breadcrumb/breadcrumb-item.model';
import { PageHeader } from '../../../../layout/page-header/page-header';
import { PageLayout } from '../../../../layout/page-layout/page-layout';
import { CountryFlagPipe } from '../../../../shared/pipes/country-flag.pipe';
import { DateTimeFormatPipe } from '../../../../shared/pipes/date-time-format.pipe';

@Component({
  selector: 'vrm-profile',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    TranslatePipe,
    PageLayout,
    PageHeader,
    DateTimeFormatPipe,
    CountryFlagPipe,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly authService = inject(AuthService);
  private readonly currentProfileStateService = inject(CurrentProfileStateService);

  protected readonly currentUser = this.authService.state.user;
  protected readonly currentProfile = this.currentProfileStateService.state.profile;
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
