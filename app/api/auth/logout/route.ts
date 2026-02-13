import { NextResponse } from 'next/server';
import { getAuthCookieClearOptions } from '@/lib/constants/cookies';

/** POST /api/auth/logout Clear authentication cookie (must use same path/domain as login) */
export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.set('auth_token', '', getAuthCookieClearOptions());
  return response;
}
