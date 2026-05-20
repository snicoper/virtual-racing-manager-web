import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { SiteUrls } from '../../../../core/navigation/site-urls';
import { BreadcrumbItem } from '../../../../layout/breadcrumb/breadcrumb-item.model';
import { PageHeader } from '../../../../layout/page-header/page-header';
import { PageLayout } from '../../../../layout/page-layout/page-layout';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { createFormState } from '../../../../shared/forms/form-utils';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { emailValidator } from '../../../../shared/forms/validators/email.validator';

@Component({
  selector: 'vrm-update',
  imports: [MatButtonModule, MatCardModule, PageLayout, PageHeader],
  templateUrl: './update.html',
  styleUrl: './update.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Update implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  protected readonly formState: FormState = createFormState(this.fb.nonNullable.group({}));
  protected readonly formInputTypes = FormInputType;
  protected readonly iconPositions = FormIconPosition;
  protected readonly siteUrls = SiteUrls;
  protected readonly breadcrumbItems = this.buildBreadcrumbItems();

  ngOnInit(): void {
    this.buildForm();
  }

  protected handleSubmit(): void {
    this.formState.isSubmitted.set(true);

    if (this.formState.form.invalid) {
      this.formState.form.markAllAsTouched();

      return;
    }

    this.formState.isLoading.set(true);
  }

  private buildBreadcrumbItems(): BreadcrumbItem[] {
    return [
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

  private buildForm(): void {
    this.formState.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, emailValidator()]],
    });
  }
}
