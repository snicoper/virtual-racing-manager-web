import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { PageLayout } from '../../../../layout/page-layout/page-layout';

@Component({
  selector: 'vrm-profile',
  imports: [RouterLink, PageLayout],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  protected readonly siteUrls = SiteUrls;
}
