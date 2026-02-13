/**
 * Seed trainers/staff data into the database.
 * Usage: npm run db:seed:trainers
 * Inserts mock trainer/staff data directly from TypeScript data structure.
 */

import { join } from 'path';
import { config } from 'dotenv';
import { query, queryOne } from '@/lib/db/db';

config({ path: join(process.cwd(), '.env.local') });

interface TrainerSeedData {
  name: string;
  email: string | null;
  phone: string;
  role: 'Trainer' | 'Staff';
  hire_date: string;
  status: 'active' | 'inactive';
}

const mockTrainers: TrainerSeedData[] = [
  // Trainers
  { name: 'Arjun Singh', email: 'arjun.singh@gym.com', phone: '+91 9876543301', role: 'Trainer', hire_date: '2024-01-15', status: 'active' },
  { name: 'Priya Mehta', email: 'priya.mehta@gym.com', phone: '+91 9876543302', role: 'Trainer', hire_date: '2024-03-20', status: 'active' },
  { name: 'Rahul Verma', email: 'rahul.verma@gym.com', phone: '+91 9876543303', role: 'Trainer', hire_date: '2024-05-10', status: 'active' },
  { name: 'Sneha Patel', email: 'sneha.patel@gym.com', phone: '+91 9876543304', role: 'Trainer', hire_date: '2024-07-05', status: 'active' },
  { name: 'Vikram Kumar', email: 'vikram.kumar@gym.com', phone: '+91 9876543305', role: 'Trainer', hire_date: '2023-11-12', status: 'inactive' },
  
  // Staff
  { name: 'Anjali Sharma', email: 'anjali.sharma@gym.com', phone: '+91 9876543306', role: 'Staff', hire_date: '2024-02-01', status: 'active' },
  { name: 'Mohit Agarwal', email: 'mohit.agarwal@gym.com', phone: '+91 9876543307', role: 'Staff', hire_date: '2024-04-18', status: 'active' },
  { name: 'Divya Reddy', email: 'divya.reddy@gym.com', phone: '+91 9876543308', role: 'Staff', hire_date: '2024-06-25', status: 'active' },
  { name: 'Karan Joshi', email: 'karan.joshi@gym.com', phone: '+91 9876543309', role: 'Staff', hire_date: '2024-08-14', status: 'active' },
  { name: 'Riya Nair', email: 'riya.nair@gym.com', phone: '+91 9876543310', role: 'Staff', hire_date: '2023-09-30', status: 'inactive' },
];

export async function seedTrainers() {
  try {
    console.log('Seeding trainers/staff data...');

    let insertedCount = 0;
    let skippedCount = 0;

    for (const trainer of mockTrainers) {
      try {
        // Check if trainer already exists (by email if provided, or by name and phone)
        let existing;
        if (trainer.email) {
          existing = await queryOne<{ id: number }>(
            'SELECT id FROM trainers WHERE email = $1',
            [trainer.email]
          );
        }
        
        if (!existing) {
          existing = await queryOne<{ id: number }>(
            'SELECT id FROM trainers WHERE name = $1 AND phone = $2',
            [trainer.name, trainer.phone]
          );
        }

        if (existing) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${trainer.name} - ${trainer.role}`);
          continue;
        }

        // Insert trainer
        await query(
          `INSERT INTO trainers (name, email, phone, role, hire_date, status)
          VALUES ($1, $2, $3, $4, $5::date, $6)`,
          [
            trainer.name,
            trainer.email,
            trainer.phone,
            trainer.role,
            trainer.hire_date,
            trainer.status,
          ]
        );

        insertedCount++;
        console.log(`✓ Inserted ${trainer.role.toLowerCase()}: ${trainer.name}`);
      } catch (error: any) {
        // Skip if trainer already exists (unique constraint violation)
        if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${trainer.name} - ${trainer.role}`);
        } else {
          console.error(`Error inserting trainer ${trainer.name}:`, error.message);
        }
      }
    }

    console.log(`\n✓ Seeding completed!`);
    console.log(`  - Inserted: ${insertedCount} trainers/staff`);
    console.log(`  - Skipped: ${skippedCount} trainers/staff (already exist)`);

    // Verify the data
    const countResult = await queryOne<{ count: string }>('SELECT COUNT(*) as count FROM trainers');
    const totalTrainers = parseInt(countResult?.count ?? '0', 10);
    console.log(`  - Total trainers/staff in database: ${totalTrainers}`);

    // Show breakdown by role
    const roleBreakdown = await query<{ role: string; count: string }>(
      'SELECT role, COUNT(*) as count FROM trainers GROUP BY role'
    );
    console.log(`  - Breakdown by role:`);
    roleBreakdown.forEach((row) => {
      console.log(`    • ${row.role}: ${row.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed trainers:', error);
    process.exit(1);
  }
}

async function run() {
  await seedTrainers();
}

if (require.main === module) {
  run();
}
