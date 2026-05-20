import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { fromApiDateTime } from '../../core/date-time/date-time.utils';

/**
 * Pipe para formatear fechas usando Luxon DateTime.
 *
 * @param value DateTime | string - Fecha a formatear
 * @param format DateTime - Formato de Luxon (DateTime.DATE_MED, DateTime.DATETIME_SHORT, etc.)
 *
 * @example
 * Formato por defecto (DATE_MED).
 * {{ account.dateJoined | dateTimeFormat }}  // Output: "Oct 14, 2023"
 *
 * @example
 * Formato específico.
 * {{ appointment.startTime | dateTimeFormat:DateTime.DATETIME_SHORT }}  // Output: "10/14/2023, 9:48 AM"
 *
 * @example
 * Con una fecha en string ISO.
 * {{ "2023-10-14T09:48:00.000Z" | dateTimeFormat }}  // Output: "Oct 14, 2023"
 *
 * @example
 * Con valor null o undefined.
 * {{ null | dateTimeFormat }}  // Output: ""
 */
@Pipe({
  name: 'dateTimeFormat',
  standalone: true,
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(
    value: DateTime | string | undefined | null,
    formatOptions = DateTime.DATE_MED,
  ): string {
    if (!value) {
      return '';
    }

    const dateTime = typeof value === 'string' ? fromApiDateTime(value) : value;

    if (!dateTime?.isValid) {
      return '';
    }

    return dateTime.toLocaleString(formatOptions);
  }
}
