import { AppEnvironment } from '../config/app-environment';

export function buildApiUrl(endpoint: string, args?: Record<string, string | number>): string {
  return `${AppEnvironment.BaseApiUrl}${buildUrl(endpoint, args)}`;
}

export function buildSiteUrl(endpoint: string, args?: Record<string, string | number>): string {
  return buildUrl(endpoint, args);
}

function buildUrl(endpoint: string, args?: Record<string, string | number>): string {
  if (!args) {
    return endpoint;
  }

  return Object.entries(args).reduce(
    (url, [key, value]) => url.replaceAll(`{${key}}`, encodeURIComponent(String(value))),
    endpoint,
  );
}
