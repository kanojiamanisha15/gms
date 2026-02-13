/**
 * Seed membership plans data into the database.
 * Usage: npm run db:seed:membership-plans
 * Inserts mock membership plan data directly from TypeScript data structure.
 * Plans match the membership types used in seed-members.ts
 */

import { join } from 'path';
import { config } from 'dotenv';
import { query, queryOne } from '@/lib/db/db';

config({ path: join(process.cwd(), '.env.local') });

interface MembershipPlanSeedData {
  name: string;
  price: number;
  duration_days: string;
  features: string | null;
  status: 'active' | 'inactive';
}

const mockMembershipPlans: MembershipPlanSeedData[] = [
  {
    name: 'Basic',
    price: 5000.00,
    duration_days: '1 month',
    features: 'Access to gym facilities, Basic equipment usage, Locker access',
    status: 'active',
  },
  {
    name: 'Premium',
    price: 15000.00,
    duration_days: '3 months',
    features: 'All Basic features, Group fitness classes, Personal trainer consultation (1 session), Nutrition guidance',
    status: 'active',
  },
  {
    name: 'Gold',
    price: 30000.00,
    duration_days: '6 months',
    features: 'All Premium features, Unlimited personal trainer sessions, Advanced equipment access, Priority booking, Body composition analysis',
    status: 'active',
  },
  {
    name: 'Platinum',
    price: 50000.00,
    duration_days: '1 year',
    features: 'All Gold features, VIP lounge access, 24/7 gym access, Customized workout plans, Monthly progress reviews, Guest passes (2 per month), Spa and sauna access',
    status: 'active',
  },
];

export async function seedMembershipPlans() {
  try {
    console.log('Seeding membership plans data...');

    let insertedCount = 0;
    let skippedCount = 0;

    for (const plan of mockMembershipPlans) {
      try {
        // Check if plan already exists (by name)
        const existing = await queryOne<{ id: number }>(
          'SELECT id FROM membership_plans WHERE name = $1',
          [plan.name]
        );

        if (existing) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${plan.name} - Rs.${plan.price}`);
          continue;
        }

        // Insert membership plan
        await query(
          `INSERT INTO membership_plans (name, price, duration_days, features, status)
          VALUES ($1, $2, $3, $4, $5)`,
          [
            plan.name,
            plan.price,
            plan.duration_days,
            plan.features,
            plan.status,
          ]
        );

        insertedCount++;
        console.log(`✓ Inserted plan: ${plan.name} - Rs.${plan.price} (${plan.duration_days})`);
      } catch (error: any) {
        // Skip if plan already exists (unique constraint violation)
        if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${plan.name} - Rs.${plan.price}`);
        } else {
          console.error(`Error inserting plan ${plan.name}:`, error.message);
        }
      }
    }

    console.log(`\n✓ Seeding completed!`);
    console.log(`  - Inserted: ${insertedCount} membership plans`);
    console.log(`  - Skipped: ${skippedCount} membership plans (already exist)`);

    // Verify the data
    const countResult = await queryOne<{ count: string }>('SELECT COUNT(*) as count FROM membership_plans');
    const totalPlans = parseInt(countResult?.count ?? '0', 10);
    console.log(`  - Total membership plans in database: ${totalPlans}`);

    // Show breakdown by status
    const statusBreakdown = await query<{ status: string; count: string }>(
      'SELECT status, COUNT(*) as count FROM membership_plans GROUP BY status'
    );
    console.log(`  - Breakdown by status:`);
    statusBreakdown.forEach((row) => {
      console.log(`    • ${row.status}: ${row.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed membership plans:', error);
    process.exit(1);
  }
}

async function run() {
  await seedMembershipPlans();
}

if (require.main === module) {
  run();
}
