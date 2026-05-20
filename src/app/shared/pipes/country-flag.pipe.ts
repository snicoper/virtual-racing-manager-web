import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFlag',
  standalone: true,
})
export class CountryFlagPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value || value.length !== 2) {
      return '';
    }

    return value.toLowerCase();
  }
}
