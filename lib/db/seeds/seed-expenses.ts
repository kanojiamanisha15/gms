/**
 * Seed expenses data into the database.
 * Usage: npm run db:seed:expenses
 * Inserts mock gym expense data directly from TypeScript data structure.
 */

import { join } from 'path';
import { config } from 'dotenv';
import { query, queryOne } from '@/lib/db/db';

config({ path: join(process.cwd(), '.env.local') });

interface ExpenseSeedData {
  category: string;
  description: string | null;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  vendor: string | null;
}

const mockExpenses: ExpenseSeedData[] = [
  // Rent & utilities
  { category: 'Rent', description: 'Monthly gym premises rent', amount: 45000.00, date: '2026-01-05', status: 'paid', vendor: 'Property Manager Ltd' },
  { category: 'Utilities', description: 'Electricity bill - January', amount: 12500.00, date: '2026-01-15', status: 'paid', vendor: 'State Power Co' },
  { category: 'Utilities', description: 'Water and sanitation', amount: 3200.00, date: '2026-01-18', status: 'paid', vendor: 'Municipal Corp' },
  { category: 'Rent', description: 'Monthly gym premises rent', amount: 45000.00, date: '2026-02-05', status: 'paid', vendor: 'Property Manager Ltd' },
  { category: 'Utilities', description: 'Electricity bill - February', amount: 11800.00, date: '2026-02-14', status: 'paid', vendor: 'State Power Co' },
  { category: 'Rent', description: 'Monthly gym premises rent', amount: 45000.00, date: '2026-03-05', status: 'paid', vendor: 'Property Manager Ltd' },
  { category: 'Utilities', description: 'Electricity bill - March', amount: 13200.00, date: '2026-03-16', status: 'paid', vendor: 'State Power Co' },

  // Equipment & maintenance
  { category: 'Equipment', description: 'Treadmill maintenance and parts', amount: 8500.00, date: '2026-01-22', status: 'paid', vendor: 'Fitness Equip Solutions' },
  { category: 'Equipment', description: 'New dumbbell set (20-50 kg)', amount: 18000.00, date: '2026-02-10', status: 'paid', vendor: 'Gym Supply Co' },
  { category: 'Maintenance', description: 'AC servicing - all units', amount: 6500.00, date: '2026-02-28', status: 'paid', vendor: 'CoolAir Services' },
  { category: 'Equipment', description: 'Resistance bands and accessories', amount: 4200.00, date: '2026-03-08', status: 'paid', vendor: 'Gym Supply Co' },
  { category: 'Maintenance', description: 'Floor cleaning and polish', amount: 5500.00, date: '2026-03-20', status: 'pending', vendor: 'CleanPro' },

  // Supplies & consumables
  { category: 'Supplies', description: 'Towels and cleaning supplies', amount: 3800.00, date: '2026-01-12', status: 'paid', vendor: 'Bulk Supplies Inc' },
  { category: 'Supplies', description: 'Sanitizer and disinfectants', amount: 2100.00, date: '2026-02-05', status: 'paid', vendor: 'Bulk Supplies Inc' },
  { category: 'Supplies', description: 'Drinking water dispensers refill', amount: 1500.00, date: '2026-03-01', status: 'paid', vendor: 'AquaPure' },

  // Salaries (sample - partial month representation)
  { category: 'Salaries', description: 'Staff salary batch - January', amount: 75000.00, date: '2026-01-31', status: 'paid', vendor: null },
  { category: 'Salaries', description: 'Staff salary batch - February', amount: 75000.00, date: '2026-02-28', status: 'paid', vendor: null },
  { category: 'Salaries', description: 'Staff salary batch - March', amount: 78000.00, date: '2026-03-31', status: 'pending', vendor: null },

  // Marketing & misc
  { category: 'Marketing', description: 'Social media ads - January', amount: 5000.00, date: '2026-01-08', status: 'paid', vendor: 'Meta Ads' },
  { category: 'Insurance', description: 'Gym liability insurance - quarterly', amount: 12000.00, date: '2026-01-15', status: 'paid', vendor: 'SecureLife Insurance' },
  { category: 'Misc', description: 'Miscellaneous repairs', amount: 3200.00, date: '2026-02-20', status: 'paid', vendor: null },
  { category: 'Marketing', description: 'Flyers and brochures', amount: 2500.00, date: '2026-03-12', status: 'paid', vendor: 'PrintWorks' },
  { category: 'Misc', description: 'Bank charges and fees', amount: 800.00, date: '2026-03-25', status: 'overdue', vendor: null },
];

export async function seedExpenses() {
  try {
    console.log('Seeding expenses data...');

    let insertedCount = 0;
    let skippedCount = 0;

    for (const expense of mockExpenses) {
      try {
        // Check if same expense already exists (category, description, amount, date)
        const existing = await queryOne<{ id: number }>(
          `SELECT id FROM expenses
           WHERE category = $1 AND amount = $2 AND date = $3::date
           AND (description IS NOT DISTINCT FROM $4)`,
          [expense.category, expense.amount, expense.date, expense.description]
        );

        if (existing) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${expense.category} - Rs.${expense.amount} (${expense.date})`);
          continue;
        }

        await query(
          `INSERT INTO expenses (category, description, amount, date, status, vendor)
          VALUES ($1, $2, $3, $4::date, $5, $6)`,
          [
            expense.category,
            expense.description,
            expense.amount,
            expense.date,
            expense.status,
            expense.vendor,
          ]
        );

        insertedCount++;
        console.log(`✓ Inserted: ${expense.category} - Rs.${expense.amount} (${expense.date})`);
      } catch (error: any) {
        if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${expense.category} - Rs.${expense.amount}`);
        } else {
          console.error(`Error inserting expense ${expense.category}:`, error.message);
        }
      }
    }

    console.log(`\n✓ Seeding completed!`);
    console.log(`  - Inserted: ${insertedCount} expenses`);
    console.log(`  - Skipped: ${skippedCount} expenses (already exist)`);

    const countResult = await queryOne<{ count: string }>('SELECT COUNT(*) as count FROM expenses');
    const total = parseInt(countResult?.count ?? '0', 10);
    console.log(`  - Total expenses in database: ${total}`);

    const statusBreakdown = await query<{ status: string; count: string }>(
      'SELECT status, COUNT(*) as count FROM expenses GROUP BY status'
    );
    console.log(`  - Breakdown by status:`);
    statusBreakdown.forEach((row) => {
      console.log(`    • ${row.status}: ${row.count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed expenses:', error);
    process.exit(1);
  }
}

async function run() {
  await seedExpenses();
}

if (require.main === module) {
  run();
}
