import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { AuthApiService } from '../../services/auth-api.service';
import { VerifyEmailRequest } from './verify-email.request';

@Component({
  selector: 'vrm-verify-email',
  imports: [RouterLink, MatCardModule, TranslatePipe],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmail implements OnInit {
  private readonly authApiService = inject(AuthApiService);
  private readonly route = inject(ActivatedRoute);

  private readonly loadingSignal = signal(true);
  private readonly isTokenValidSignal = signal(false);

  protected readonly loading = this.loadingSignal.asReadonly();
  protected readonly isTokenValid = this.isTokenValidSignal.asReadonly();
  protected readonly siteUrls = SiteUrls;
  protected readonly siteName = AppEnvironment.SiteName;

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isTokenValidSignal.set(false);

      return;
    }

    const verifyEmailRequest: VerifyEmailRequest = {
      token: token,
    };

    this.loadingSignal.set(true);

    this.authApiService
      .verifyEmail(verifyEmailRequest)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: () => {
          this.isTokenValidSignal.set(true);
        },
        error: () => {
          this.isTokenValidSignal.set(false);
        },
      });
  }
}
