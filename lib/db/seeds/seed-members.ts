/**
 * Seed members data into the database.
 * Usage: npx tsx lib/db/seeds/seed-members.ts
 * Inserts mock member data from lib/db/mock-members.sql
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { query } from '@/lib/db/db';

config({ path: join(process.cwd(), '.env.local') });

async function seedMembers() {
  try {
    console.log('Seeding members data...');

    const seedPath = join(process.cwd(), 'lib', 'db', 'mock-members.sql');
    const seedFile = readFileSync(seedPath, 'utf-8');

    // Split by semicolon and filter out comments and empty statements
    const statements = seedFile
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.toLowerCase().startsWith('select') && !s.toLowerCase().startsWith('truncate'));

    let insertedCount = 0;
    let skippedCount = 0;

    for (const statement of statements) {
      try {
        await query(statement);
        insertedCount++;
        // Extract member_id from INSERT statement for logging
        const memberIdMatch = statement.match(/\(['"]?([^'",]+)['"]?/);
        const memberId = memberIdMatch ? memberIdMatch[1] : 'unknown';
        console.log(`✓ Inserted member: ${memberId}`);
      } catch (error: any) {
        // Skip if member already exists (unique constraint violation)
        if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          skippedCount++;
          const memberIdMatch = statement.match(/\(['"]?([^'",]+)['"]?/);
          const memberId = memberIdMatch ? memberIdMatch[1] : 'unknown';
          console.log(`⊘ Skipped (already exists): ${memberId}`);
        } else {
          console.error('Error executing statement:', error.message);
          console.error('Statement:', statement.substring(0, 100));
        }
      }
    }

    console.log(`\n✓ Seeding completed!`);
    console.log(`  - Inserted: ${insertedCount} members`);
    console.log(`  - Skipped: ${skippedCount} members (already exist)`);

    // Verify the data
    const countResult = await query<{ count: string }>('SELECT COUNT(*) as count FROM members');
    const totalMembers = parseInt(countResult[0]?.count ?? '0', 10);
    console.log(`  - Total members in database: ${totalMembers}`);

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed members:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedMembers();
}

export { seedMembers };
