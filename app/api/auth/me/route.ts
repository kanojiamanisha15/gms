import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db/db';
import { requireAuth } from '@/lib/services/auth';

/** GET /api/auth/me - Return current user from auth cookie */
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  const { payload } = auth;

  const user = await queryOne<{
    id: number;
    email: string;
    name: string;
    role?: string;
    created_at: Date;
  }>(
    'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
    [payload.userId]
  );

  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        created_at: user.created_at,
      },
    },
  });
}
