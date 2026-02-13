/**
 * Seed members data into the database.
 * Usage: npm run db:seed:members
 * Inserts mock member data directly from TypeScript data structure.
 */

import { join } from 'path';
import { config } from 'dotenv';
import { query, queryOne } from '@/lib/db/db';

config({ path: join(process.cwd(), '.env.local') });

interface MemberSeedData {
  member_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  membership_type: string;
  join_date: string;
  expiry_date: string | null;
  status: 'active' | 'inactive' | 'expired';
  payment_status: 'paid' | 'unpaid';
  payment_amount: number;
}

const mockMembers: MemberSeedData[] = [
  // January 2025 members
  { member_id: '5JA01', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 9876543210', membership_type: 'Premium', join_date: '2025-01-05', expiry_date: '2025-04-05', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5JA02', name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 9876543211', membership_type: 'Basic', join_date: '2025-01-08', expiry_date: '2025-02-08', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5JA03', name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 9876543212', membership_type: 'Gold', join_date: '2025-01-12', expiry_date: '2025-07-12', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5JA04', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 9876543213', membership_type: 'Premium', join_date: '2025-01-15', expiry_date: '2025-04-15', status: 'active', payment_status: 'unpaid', payment_amount: 15000.00 },
  { member_id: '5JA05', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 9876543214', membership_type: 'Basic', join_date: '2025-01-18', expiry_date: '2025-02-18', status: 'expired', payment_status: 'unpaid', payment_amount: 5000.00 },

  // February 2025 members
  { member_id: '5FE01', name: 'Anjali Mehta', email: 'anjali.mehta@email.com', phone: '+91 9876543215', membership_type: 'Platinum', join_date: '2025-02-01', expiry_date: '2026-02-01', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5FE02', name: 'Rahul Verma', email: 'rahul.verma@email.com', phone: '+91 9876543216', membership_type: 'Premium', join_date: '2025-02-03', expiry_date: '2025-05-03', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5FE03', name: 'Kavita Nair', email: 'kavita.nair@email.com', phone: '+91 9876543217', membership_type: 'Basic', join_date: '2025-02-05', expiry_date: '2025-03-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5FE04', name: 'Mohit Agarwal', email: 'mohit.agarwal@email.com', phone: '+91 9876543218', membership_type: 'Gold', join_date: '2025-02-08', expiry_date: '2025-08-08', status: 'active', payment_status: 'unpaid', payment_amount: 30000.00 },
  { member_id: '5FE05', name: 'Divya Joshi', email: 'divya.joshi@email.com', phone: '+91 9876543219', membership_type: 'Premium', join_date: '2025-02-10', expiry_date: '2025-05-10', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5FE06', name: 'Arjun Desai', email: 'arjun.desai@email.com', phone: '+91 9876543220', membership_type: 'Basic', join_date: '2025-02-12', expiry_date: '2025-03-12', status: 'inactive', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5FE07', name: 'Meera Iyer', email: 'meera.iyer@email.com', phone: '+91 9876543221', membership_type: 'Platinum', join_date: '2025-02-15', expiry_date: '2026-02-15', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },

  // March 2025 members
  { member_id: '5MR01', name: 'Suresh Menon', email: 'suresh.menon@email.com', phone: '+91 9876543222', membership_type: 'Gold', join_date: '2025-03-01', expiry_date: '2025-09-01', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5MR02', name: 'Lakshmi Rao', email: 'lakshmi.rao@email.com', phone: '+91 9876543223', membership_type: 'Premium', join_date: '2025-03-03', expiry_date: '2025-06-03', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5MR03', name: 'Nikhil Gupta', email: 'nikhil.gupta@email.com', phone: '+91 9876543224', membership_type: 'Basic', join_date: '2025-03-05', expiry_date: '2025-04-05', status: 'active', payment_status: 'unpaid', payment_amount: 5000.00 },
  { member_id: '5MR04', name: 'Pooja Shah', email: 'pooja.shah@email.com', phone: '+91 9876543225', membership_type: 'Premium', join_date: '2025-03-08', expiry_date: '2025-06-08', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5MR05', name: 'Ravi Krishnan', email: 'ravi.krishnan@email.com', phone: '+91 9876543226', membership_type: 'Gold', join_date: '2025-03-10', expiry_date: '2025-09-10', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5MR06', name: 'Swati Malhotra', email: 'swati.malhotra@email.com', phone: '+91 9876543227', membership_type: 'Basic', join_date: '2025-03-12', expiry_date: '2025-04-12', status: 'expired', payment_status: 'unpaid', payment_amount: 5000.00 },
  { member_id: '5MR07', name: 'Aditya Kapoor', email: 'aditya.kapoor@email.com', phone: '+91 9876543228', membership_type: 'Platinum', join_date: '2025-03-15', expiry_date: '2026-03-15', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5MR08', name: 'Neha Chaturvedi', email: 'neha.chaturvedi@email.com', phone: '+91 9876543229', membership_type: 'Premium', join_date: '2025-03-18', expiry_date: '2025-06-18', status: 'active', payment_status: 'unpaid', payment_amount: 15000.00 },

  // April 2025 members
  { member_id: '5AP01', name: 'Karan Thakur', email: 'karan.thakur@email.com', phone: '+91 9876543230', membership_type: 'Gold', join_date: '2025-04-01', expiry_date: '2025-10-01', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5AP02', name: 'Riya Banerjee', email: 'riya.banerjee@email.com', phone: '+91 9876543231', membership_type: 'Premium', join_date: '2025-04-03', expiry_date: '2025-07-03', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5AP03', name: 'Varun Mishra', email: 'varun.mishra@email.com', phone: '+91 9876543232', membership_type: 'Basic', join_date: '2025-04-05', expiry_date: '2025-05-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5AP04', name: 'Anita Das', email: 'anita.das@email.com', phone: '+91 9876543233', membership_type: 'Premium', join_date: '2025-04-08', expiry_date: '2025-07-08', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5AP05', name: 'Siddharth Rana', email: 'siddharth.rana@email.com', phone: '+91 9876543234', membership_type: 'Gold', join_date: '2025-04-10', expiry_date: '2025-10-10', status: 'active', payment_status: 'unpaid', payment_amount: 30000.00 },
  { member_id: '5AP06', name: 'Tanya Oberoi', email: 'tanya.oberoi@email.com', phone: '+91 9876543235', membership_type: 'Platinum', join_date: '2025-04-12', expiry_date: '2026-04-12', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5AP07', name: 'Rohan Bansal', email: 'rohan.bansal@email.com', phone: '+91 9876543236', membership_type: 'Basic', join_date: '2025-04-15', expiry_date: '2025-05-15', status: 'inactive', payment_status: 'paid', payment_amount: 5000.00 },

  // May 2025 members
  { member_id: '5MY01', name: 'Isha Tripathi', email: 'isha.tripathi@email.com', phone: '+91 9876543237', membership_type: 'Premium', join_date: '2025-05-01', expiry_date: '2025-08-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5MY02', name: 'Yash Goel', email: 'yash.goel@email.com', phone: '+91 9876543238', membership_type: 'Gold', join_date: '2025-05-03', expiry_date: '2025-11-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5MY03', name: 'Shreya Agarwal', email: 'shreya.agarwal@email.com', phone: '+91 9876543239', membership_type: 'Basic', join_date: '2025-05-05', expiry_date: '2025-06-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5MY04', name: 'Harsh Varma', email: 'harsh.varma@email.com', phone: '+91 9876543240', membership_type: 'Premium', join_date: '2025-05-08', expiry_date: '2025-08-08', status: 'active', payment_status: 'unpaid', payment_amount: 15000.00 },
  { member_id: '5MY05', name: 'Aishwarya Nair', email: 'aishwarya.nair@email.com', phone: '+91 9876543241', membership_type: 'Platinum', join_date: '2025-05-10', expiry_date: '2026-05-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5MY06', name: 'Kunal Mehta', email: 'kunal.mehta@email.com', phone: '+91 9876543242', membership_type: 'Gold', join_date: '2025-05-12', expiry_date: '2025-11-12', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5MY07', name: 'Ritika Singh', email: 'ritika.singh@email.com', phone: '+91 9876543243', membership_type: 'Basic', join_date: '2025-05-15', expiry_date: '2025-06-15', status: 'expired', payment_status: 'unpaid', payment_amount: 5000.00 },

  // June 2025 members
  { member_id: '5JN01', name: 'Abhishek Reddy', email: 'abhishek.reddy@email.com', phone: '+91 9876543244', membership_type: 'Premium', join_date: '2025-06-01', expiry_date: '2025-09-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5JN02', name: 'Manisha Patel', email: 'manisha.patel@email.com', phone: '+91 9876543245', membership_type: 'Gold', join_date: '2025-06-03', expiry_date: '2025-12-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5JN03', name: 'Vivek Kumar', email: 'vivek.kumar@email.com', phone: '+91 9876543246', membership_type: 'Basic', join_date: '2025-06-05', expiry_date: '2025-07-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5JN04', name: 'Deepika Sharma', email: 'deepika.sharma@email.com', phone: '+91 9876543247', membership_type: 'Premium', join_date: '2025-06-08', expiry_date: '2025-09-08', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5JN05', name: 'Rishabh Joshi', email: 'rishabh.joshi@email.com', phone: '+91 9876543248', membership_type: 'Platinum', join_date: '2025-06-10', expiry_date: '2026-06-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5JN06', name: 'Sakshi Verma', email: 'sakshi.verma@email.com', phone: '+91 9876543249', membership_type: 'Gold', join_date: '2025-06-12', expiry_date: '2025-12-12', status: 'active', payment_status: 'unpaid', payment_amount: 30000.00 },
  { member_id: '5JN07', name: 'Aman Desai', email: 'aman.desai@email.com', phone: '+91 9876543250', membership_type: 'Basic', join_date: '2025-06-15', expiry_date: '2025-07-15', status: 'inactive', payment_status: 'paid', payment_amount: 5000.00 },

  // July 2025 members
  { member_id: '5JL01', name: 'Preeti Iyer', email: 'preeti.iyer@email.com', phone: '+91 9876543251', membership_type: 'Premium', join_date: '2025-07-01', expiry_date: '2025-10-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5JL02', name: 'Gaurav Menon', email: 'gaurav.menon@email.com', phone: '+91 9876543252', membership_type: 'Gold', join_date: '2025-07-03', expiry_date: '2026-01-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5JL03', name: 'Jyoti Rao', email: 'jyoti.rao@email.com', phone: '+91 9876543253', membership_type: 'Basic', join_date: '2025-07-05', expiry_date: '2025-08-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5JL04', name: 'Saurabh Gupta', email: 'saurabh.gupta@email.com', phone: '+91 9876543254', membership_type: 'Premium', join_date: '2025-07-08', expiry_date: '2025-10-08', status: 'active', payment_status: 'unpaid', payment_amount: 15000.00 },
  { member_id: '5JL05', name: 'Nisha Shah', email: 'nisha.shah@email.com', phone: '+91 9876543255', membership_type: 'Platinum', join_date: '2025-07-10', expiry_date: '2026-07-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5JL06', name: 'Rajat Krishnan', email: 'rajat.krishnan@email.com', phone: '+91 9876543256', membership_type: 'Gold', join_date: '2025-07-12', expiry_date: '2026-01-12', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5JL07', name: 'Urvashi Malhotra', email: 'urvashi.malhotra@email.com', phone: '+91 9876543257', membership_type: 'Basic', join_date: '2025-07-15', expiry_date: '2025-08-15', status: 'expired', payment_status: 'unpaid', payment_amount: 5000.00 },

  // August 2025 members
  { member_id: '5AU01', name: 'Kiran Kapoor', email: 'kiran.kapoor@email.com', phone: '+91 9876543258', membership_type: 'Premium', join_date: '2025-08-01', expiry_date: '2025-11-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5AU02', name: 'Rohit Chaturvedi', email: 'rohit.chaturvedi@email.com', phone: '+91 9876543259', membership_type: 'Gold', join_date: '2025-08-03', expiry_date: '2026-02-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5AU03', name: 'Sunita Thakur', email: 'sunita.thakur@email.com', phone: '+91 9876543260', membership_type: 'Basic', join_date: '2025-08-05', expiry_date: '2025-09-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5AU04', name: 'Ankit Banerjee', email: 'ankit.banerjee@email.com', phone: '+91 9876543261', membership_type: 'Premium', join_date: '2025-08-08', expiry_date: '2025-11-08', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5AU05', name: 'Pallavi Mishra', email: 'pallavi.mishra@email.com', phone: '+91 9876543262', membership_type: 'Platinum', join_date: '2025-08-10', expiry_date: '2026-08-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5AU06', name: 'Sandeep Das', email: 'sandeep.das@email.com', phone: '+91 9876543263', membership_type: 'Gold', join_date: '2025-08-12', expiry_date: '2026-02-12', status: 'active', payment_status: 'unpaid', payment_amount: 30000.00 },
  { member_id: '5AU07', name: 'Monika Rana', email: 'monika.rana@email.com', phone: '+91 9876543264', membership_type: 'Basic', join_date: '2025-08-15', expiry_date: '2025-09-15', status: 'inactive', payment_status: 'paid', payment_amount: 5000.00 },

  // September 2025 members
  { member_id: '5SE01', name: 'Vikrant Oberoi', email: 'vikrant.oberoi@email.com', phone: '+91 9876543265', membership_type: 'Premium', join_date: '2025-09-01', expiry_date: '2025-12-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5SE02', name: 'Radhika Bansal', email: 'radhika.bansal@email.com', phone: '+91 9876543266', membership_type: 'Gold', join_date: '2025-09-03', expiry_date: '2026-03-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5SE03', name: 'Naveen Tripathi', email: 'naveen.tripathi@email.com', phone: '+91 9876543267', membership_type: 'Basic', join_date: '2025-09-05', expiry_date: '2025-10-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5SE04', name: 'Shilpa Goel', email: 'shilpa.goel@email.com', phone: '+91 9876543268', membership_type: 'Premium', join_date: '2025-09-08', expiry_date: '2025-12-08', status: 'active', payment_status: 'unpaid', payment_amount: 15000.00 },
  { member_id: '5SE05', name: 'Manoj Agarwal', email: 'manoj.agarwal@email.com', phone: '+91 9876543269', membership_type: 'Platinum', join_date: '2025-09-10', expiry_date: '2026-09-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5SE06', name: 'Kavya Varma', email: 'kavya.varma@email.com', phone: '+91 9876543270', membership_type: 'Gold', join_date: '2025-09-12', expiry_date: '2026-03-12', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5SE07', name: 'Dinesh Nair', email: 'dinesh.nair@email.com', phone: '+91 9876543271', membership_type: 'Basic', join_date: '2025-09-15', expiry_date: '2025-10-15', status: 'expired', payment_status: 'unpaid', payment_amount: 5000.00 },

  // October 2025 members
  { member_id: '5OC01', name: 'Rekha Mehta', email: 'rekha.mehta@email.com', phone: '+91 9876543272', membership_type: 'Premium', join_date: '2025-10-01', expiry_date: '2026-01-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5OC02', name: 'Sachin Verma', email: 'sachin.verma@email.com', phone: '+91 9876543273', membership_type: 'Gold', join_date: '2025-10-03', expiry_date: '2026-04-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5OC03', name: 'Madhuri Joshi', email: 'madhuri.joshi@email.com', phone: '+91 9876543274', membership_type: 'Basic', join_date: '2025-10-05', expiry_date: '2025-11-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5OC04', name: 'Pramod Desai', email: 'pramod.desai@email.com', phone: '+91 9876543275', membership_type: 'Premium', join_date: '2025-10-08', expiry_date: '2026-01-08', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5OC05', name: 'Anushka Iyer', email: 'anushka.iyer@email.com', phone: '+91 9876543276', membership_type: 'Platinum', join_date: '2025-10-10', expiry_date: '2026-10-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5OC06', name: 'Ramesh Menon', email: 'ramesh.menon@email.com', phone: '+91 9876543277', membership_type: 'Gold', join_date: '2025-10-12', expiry_date: '2026-04-12', status: 'active', payment_status: 'unpaid', payment_amount: 30000.00 },
  { member_id: '5OC07', name: 'Suman Rao', email: 'suman.rao@email.com', phone: '+91 9876543278', membership_type: 'Basic', join_date: '2025-10-15', expiry_date: '2025-11-15', status: 'inactive', payment_status: 'paid', payment_amount: 5000.00 },

  // November 2025 members
  { member_id: '5NO01', name: 'Vijay Gupta', email: 'vijay.gupta@email.com', phone: '+91 9876543279', membership_type: 'Premium', join_date: '2025-11-01', expiry_date: '2026-02-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5NO02', name: 'Lata Shah', email: 'lata.shah@email.com', phone: '+91 9876543280', membership_type: 'Gold', join_date: '2025-11-03', expiry_date: '2026-05-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5NO03', name: 'Ajay Krishnan', email: 'ajay.krishnan@email.com', phone: '+91 9876543281', membership_type: 'Basic', join_date: '2025-11-05', expiry_date: '2025-12-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5NO04', name: 'Geeta Malhotra', email: 'geeta.malhotra@email.com', phone: '+91 9876543282', membership_type: 'Premium', join_date: '2025-11-08', expiry_date: '2026-02-08', status: 'active', payment_status: 'unpaid', payment_amount: 15000.00 },
  { member_id: '5NO05', name: 'Rajesh Kapoor', email: 'rajesh.kapoor@email.com', phone: '+91 9876543283', membership_type: 'Platinum', join_date: '2025-11-10', expiry_date: '2026-11-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5NO06', name: 'Sarita Chaturvedi', email: 'sarita.chaturvedi@email.com', phone: '+91 9876543284', membership_type: 'Gold', join_date: '2025-11-12', expiry_date: '2026-05-12', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5NO07', name: 'Mahesh Thakur', email: 'mahesh.thakur@email.com', phone: '+91 9876543285', membership_type: 'Basic', join_date: '2025-11-15', expiry_date: '2025-12-15', status: 'expired', payment_status: 'unpaid', payment_amount: 5000.00 },

  // December 2025 members
  { member_id: '5DE01', name: 'Kamala Banerjee', email: 'kamala.banerjee@email.com', phone: '+91 9876543286', membership_type: 'Premium', join_date: '2025-12-01', expiry_date: '2026-03-01', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5DE02', name: 'Suresh Mishra', email: 'suresh.mishra@email.com', phone: '+91 9876543287', membership_type: 'Gold', join_date: '2025-12-03', expiry_date: '2026-06-03', status: 'active', payment_status: 'paid', payment_amount: 30000.00 },
  { member_id: '5DE03', name: 'Indira Das', email: 'indira.das@email.com', phone: '+91 9876543288', membership_type: 'Basic', join_date: '2025-12-05', expiry_date: '2026-01-05', status: 'active', payment_status: 'paid', payment_amount: 5000.00 },
  { member_id: '5DE04', name: 'Bharat Rana', email: 'bharat.rana@email.com', phone: '+91 9876543289', membership_type: 'Premium', join_date: '2025-12-08', expiry_date: '2026-03-08', status: 'active', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '5DE05', name: 'Lakshmi Oberoi', email: 'lakshmi.oberoi@email.com', phone: '+91 9876543290', membership_type: 'Platinum', join_date: '2025-12-10', expiry_date: '2026-12-10', status: 'active', payment_status: 'paid', payment_amount: 50000.00 },
  { member_id: '5DE06', name: 'Gopal Bansal', email: 'gopal.bansal@email.com', phone: '+91 9876543291', membership_type: 'Gold', join_date: '2025-12-12', expiry_date: '2026-06-12', status: 'active', payment_status: 'unpaid', payment_amount: 30000.00 },
  { member_id: '5DE07', name: 'Sita Tripathi', email: 'sita.tripathi@email.com', phone: '+91 9876543292', membership_type: 'Basic', join_date: '2025-12-15', expiry_date: '2026-01-15', status: 'inactive', payment_status: 'paid', payment_amount: 5000.00 },

  // Some expired and inactive members from previous months (for testing)
  { member_id: '4DE15', name: 'Old Member One', email: 'old.member1@email.com', phone: '+91 9876543293', membership_type: 'Basic', join_date: '2024-12-20', expiry_date: '2025-01-20', status: 'expired', payment_status: 'unpaid', payment_amount: 5000.00 },
  { member_id: '4DE16', name: 'Old Member Two', email: 'old.member2@email.com', phone: '+91 9876543294', membership_type: 'Premium', join_date: '2024-12-22', expiry_date: '2025-03-22', status: 'expired', payment_status: 'paid', payment_amount: 15000.00 },
  { member_id: '4NO20', name: 'Inactive Member', email: 'inactive.member@email.com', phone: '+91 9876543295', membership_type: 'Gold', join_date: '2024-11-25', expiry_date: '2025-05-25', status: 'inactive', payment_status: 'paid', payment_amount: 30000.00 },
];

export async function seedMembers() {
  try {
    console.log('Seeding members data...');

    let insertedCount = 0;
    let skippedCount = 0;

    for (const member of mockMembers) {
      try {
        // Check if member already exists
        const existing = await queryOne<{ id: number }>(
          'SELECT id FROM members WHERE member_id = $1',
          [member.member_id]
        );

        if (existing) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${member.member_id} - ${member.name}`);
          continue;
        }

        // Insert member
        await query(
          `INSERT INTO members (
            member_id, name, email, phone, membership_type,
            join_date, expiry_date, status, payment_status, payment_amount
          )
          VALUES ($1, $2, $3, $4, $5, $6::date, $7::date, $8, $9, $10)`,
          [
            member.member_id,
            member.name,
            member.email,
            member.phone,
            member.membership_type,
            member.join_date,
            member.expiry_date,
            member.status,
            member.payment_status,
            member.payment_amount,
          ]
        );

        insertedCount++;
        console.log(`✓ Inserted member: ${member.member_id} - ${member.name}`);
      } catch (error: any) {
        // Skip if member already exists (unique constraint violation)
        if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          skippedCount++;
          console.log(`⊘ Skipped (already exists): ${member.member_id} - ${member.name}`);
        } else {
          console.error(`Error inserting member ${member.member_id}:`, error.message);
        }
      }
    }

    console.log(`\n✓ Seeding completed!`);
    console.log(`  - Inserted: ${insertedCount} members`);
    console.log(`  - Skipped: ${skippedCount} members (already exist)`);

    // Verify the data
    const countResult = await queryOne<{ count: string }>('SELECT COUNT(*) as count FROM members');
    const totalMembers = parseInt(countResult?.count ?? '0', 10);
    console.log(`  - Total members in database: ${totalMembers}`);

    process.exit(0);
  } catch (error) {
    console.error('Failed to seed members:', error);
    process.exit(1);
  }
}

async function run() {
  await seedMembers();
}

if (require.main === module) {
  run();
}

