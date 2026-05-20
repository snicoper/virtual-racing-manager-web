/* eslint-disable  @typescript-eslint/no-empty-function */
import { Component, forwardRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { TranslatePipe } from '@ngx-translate/core';
import { CountryLocaleService } from '../../../../core/localization/country-locale.service';
import { CountryFlagPipe } from '../../../pipes/country-flag.pipe';
import { FieldError } from '../../errors/field-error/field-error';
import { FormState } from '../../form-state.model';

@Component({
  selector: 'vrm-country-select',
  imports: [
    FormsModule,
    NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    TranslatePipe,
    FieldError,
    CountryFlagPipe,
  ],
  templateUrl: './country-select.html',
  styleUrl: './country-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelect),
      multi: true,
    },
  ],
})
export class CountrySelect implements ControlValueAccessor {
  private readonly countryLocaleService = inject(CountryLocaleService);

  readonly formState = input.required<FormState>();
  readonly fieldName = input.required<string>();
  readonly labelKey = input.required<string>();
  readonly placeholderKey = input('');

  protected readonly value = signal('');
  protected readonly isDisabled = signal(false);

  protected readonly countries = this.countryLocaleService.value;

  // Generate unique id for each instance of the component.
  private static nextId = 0;
  protected readonly id = `country-select-${(CountrySelect.nextId += 1)}`;

  private onChange: (value: string) => void = () => {};
  private onTouch: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onChangeValue(value: string): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouch();
  }
}
