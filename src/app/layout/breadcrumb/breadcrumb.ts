import { ChangeDetectionStrategy, Component, input, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SiteUrls } from '../../core/navigation/site-urls';
import { BreadcrumbItem } from './breadcrumb-item.model';

@Component({
  selector: 'vrm-breadcrumb',
  imports: [RouterLink, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumb implements OnInit {
  readonly iconSeparator = input('keyboard_arrow_right');
  readonly items = model<BreadcrumbItem[]>([]);

  protected readonly siteUrls = SiteUrls;

  ngOnInit(): void {
    this.items.set([
      { label: 'common.home', link: this.siteUrls.home, icon: 'home' },
      ...this.items(),
    ]);
  }
}
