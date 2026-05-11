import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { AppEnvironment } from '../config/app-environment';

@Injectable({ providedIn: 'root' })
export class TitleStrategyService extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(routerState);

    this.title.setTitle(
      pageTitle ? `${AppEnvironment.SiteName} | ${pageTitle}` : AppEnvironment.SiteName,
    );
  }
}
