import { DateTime } from 'luxon';

/** Convert API value to DateTime. */

export function fromApiDateTime(value: string | DateTime | null | undefined): DateTime | null {
  if (!value) {
    return null;
  }

  if (DateTime.isDateTime(value)) {
    return value;
  }

  return DateTime.fromISO(value);
}

/** Convert API value to DateTime where the value is required. */
export function fromApiRequiredDateTime(value: string | DateTime): DateTime {
  if (DateTime.isDateTime(value)) {
    return value;
  }

  return DateTime.fromISO(value);
}

/** Convert DateTime to API ISO string. */
export function toApiDateTime(value: DateTime | null | undefined): string | null {
  return value?.toISO() ?? null;
}

/** Convert DateTime to UTC ISO string. */
export function toUtcIsoString(value: DateTime): string {
  return value.toUTC().toISO()!;
}

/** Convert UTC ISO string to local DateTime. */
export function fromUtcIsoString(value: string): DateTime {
  return DateTime.fromISO(value, { zone: 'utc' }).toLocal();
}

/** Get current UTC DateTime. */
export function utcNow(): DateTime {
  return DateTime.utc();
}

/** Get current local DateTime. */
export function now(): DateTime {
  return DateTime.local();
}

/** Format DateTime using the provided format. */
export function formatDateTime(value: DateTime, format: string): string {
  return value.toFormat(format);
}

/** Check if DateTime is valid. */
export function isValidDateTime(value: DateTime): boolean {
  return value.isValid;
}
