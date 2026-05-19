import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { BreadcrumbItem } from '../breadcrumb/breadcrumb-item.model';

@Component({
  selector: 'vrm-page-header',
  imports: [MatCardModule, Breadcrumb, TranslatePipe],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  title = input('');
  subtitle = input('');
  breadcrumbItems = input<BreadcrumbItem[]>([]);
}
