/**
 * Shared auth cookie options so setting and clearing use the same scope.
 * Using identical path/domain/sameSite when clearing ensures the correct cookie is removed.
 */

const SEVEN_DAYS_SEC = 60 * 60 * 24 * 7;
const isProduction = process.env.NODE_ENV === 'production';

/** Options used when setting the auth cookie (login/register) */
export function getAuthCookieSetOptions() {
  const expires = new Date(Date.now() + SEVEN_DAYS_SEC * 1000);
  const options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
    maxAge: number;
    path: string;
    expires?: Date;
    domain?: string;
  } = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: SEVEN_DAYS_SEC,
    path: '/',
    expires, // explicit expires helps some browsers/proxies persist across refresh
  };
  // In production, optional domain (e.g. .example.com) so cookie works across subdomains
  const domain = process.env.COOKIE_DOMAIN;
  if (domain) {
    options.domain = domain;
  }
  return options;
}

/** Options used when clearing the auth cookie (logout). Must match path/domain of set. */
export function getAuthCookieClearOptions() {
  const options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
    maxAge: number;
    path: string;
    domain?: string;
  } = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  };
  const domain = process.env.COOKIE_DOMAIN;
  if (domain) {
    options.domain = domain;
  }
  return options;
}
