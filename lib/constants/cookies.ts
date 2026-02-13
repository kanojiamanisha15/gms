/**
 * Shared auth cookie options so setting and clearing use the same scope.
 * Using identical path/domain/sameSite when clearing ensures the correct cookie is removed.
 *
 * When app is served over HTTP (e.g. http://IP:3000), set COOKIE_SECURE=false
 * or the browser will not store/send the cookie and you'll be redirected to login.
 */

const SEVEN_DAYS_SEC = 60 * 60 * 24 * 7;
const isProduction = process.env.NODE_ENV === 'production';

// Secure cookie only over HTTPS. Set COOKIE_SECURE=false when using HTTP (e.g. http://IP:3000)
const cookieSecure =
  process.env.COOKIE_SECURE !== undefined
    ? process.env.COOKIE_SECURE === 'true'
    : isProduction;

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
    secure: cookieSecure,
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
    secure: cookieSecure,
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