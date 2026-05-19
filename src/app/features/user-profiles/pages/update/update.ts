import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadcrumbItem } from '../../../../layout/breadcrumb/breadcrumb-item.model';
import { PageHeader } from '../../../../layout/page-header/page-header';
import { PageLayout } from '../../../../layout/page-layout/page-layout';

@Component({
  selector: 'vrm-update',
  imports: [PageLayout, PageHeader],
  templateUrl: './update.html',
  styleUrl: './update.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Update {
  readonly breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'userProfiles.profile.title',
      icon: 'person',
      link: '/user-profiles',
    },
    {
      label: 'userProfiles.update.title',
      icon: 'edit',
    },
  ];
}
