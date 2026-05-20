import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { CurrentProfileStateService } from '../../core/states/current-profile/current-profile-state.service';
import { PageLayout } from '../../layout/page-layout/page-layout';

@Component({
  selector: 'vrm-home',
  imports: [CommonModule, PageLayout],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly authService = inject(AuthService);
  private readonly currentProfileStateService = inject(CurrentProfileStateService);

  protected readonly user = this.authService.state.user;
  protected readonly profile = this.currentProfileStateService.state.profile;
}
