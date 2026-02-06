import { getPool, query } from './db';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/** Delete notifications older than 7 days. Returns count deleted. */
export async function deleteNotificationsOlderThan7Days(): Promise<number> {
  const pool = getPool();
  const result = await pool.query(
    `DELETE FROM notifications WHERE created_at < NOW() - INTERVAL '7 days'`
  );
  return result.rowCount ?? 0;
}

/** Insert a notification. Does not throw - logs errors so main flow continues. */
export async function insertNotification(
  title: string,
  message: string,
  type: NotificationType = 'info'
): Promise<void> {
  try {
    await query(
      `INSERT INTO notifications (title, message, type) VALUES ($1, $2, $3)`,
      [title, message, type]
    );
  } catch (err) {
    console.error('Failed to create notification:', err);
  }
}
