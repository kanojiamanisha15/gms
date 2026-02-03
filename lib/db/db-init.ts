/**
 * Database schema initialization.
 * Usage: npm run db:init
 * Creates tables from lib/db/db-schema.sql. Does not seed data.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { query } from '@/lib/db/db';

config({ path: join(process.cwd(), '.env.local') });

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    const schemaPath = join(process.cwd(), 'lib', 'db', 'db-schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      try {
        await query(statement);
        console.log('✓ Executed:', statement.substring(0, 50) + '...');
      } catch (error: any) {
        if (!error.message.includes('already exists')) {
          console.error('Error executing statement:', error.message);
          console.error('Statement:', statement.substring(0, 100));
        }
      }
    }

    console.log('Database initialization completed!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  initializeDatabase();
}

export { initializeDatabase };
