import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { AuthApiService } from '../../services/auth-api.service';

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

  protected readonly loading = signal(true);
  protected readonly isTokenValid = signal(false);
  protected readonly siteUrls = SiteUrls;
  protected readonly siteName = AppEnvironment.SiteName;

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.isTokenValid.set(false);

      return;
    }

    this.authApiService
      .verifyEmail({ token })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.isTokenValid.set(true);
        },
        error: () => {
          this.isTokenValid.set(false);
        },
      });
  }
}
