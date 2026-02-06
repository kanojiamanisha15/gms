const cron = require('node-cron');
import { deleteNotificationsOlderThan7Days } from '@/lib/db/notifications';

export const initCrons = () => {
  // Delete notifications older than 7 days - runs daily at midnight
  cron.schedule('0 0 */7 * *', async () => {
    try {
      const deleted = await deleteNotificationsOlderThan7Days();
      if (deleted > 0) {
        console.log(`[Cron] Deleted ${deleted} notification(s) older than 7 days`);
      }
    } catch (err) {
      console.error('[Cron] Failed to delete old notifications:', err);
    }
  });
};
