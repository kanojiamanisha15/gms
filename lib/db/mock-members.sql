-- Mock Data for Members Table
-- This file contains sample member data following the database schema and member ID generation pattern
-- Member ID format: {lastDigitOfYear}{monthCode}{sequentialNumber}
-- Example: 5FE01 = February 2025, member #1

-- Clear existing data (optional - uncomment if you want to reset)
-- TRUNCATE TABLE members RESTART IDENTITY CASCADE;

-- Insert mock members data
INSERT INTO members (member_id, name, email, phone, membership_type, join_date, expiry_date, status, payment_status, payment_amount) VALUES
-- January 2025 members
('5JA01', 'Rajesh Kumar', 'rajesh.kumar@email.com', '+91 9876543210', 'Premium', '2025-01-05', '2025-04-05', 'active', 'paid', 15000.00),
('5JA02', 'Priya Sharma', 'priya.sharma@email.com', '+91 9876543211', 'Basic', '2025-01-08', '2025-02-08', 'active', 'paid', 5000.00),
('5JA03', 'Amit Patel', 'amit.patel@email.com', '+91 9876543212', 'Gold', '2025-01-12', '2025-07-12', 'active', 'paid', 30000.00),
('5JA04', 'Sneha Reddy', 'sneha.reddy@email.com', '+91 9876543213', 'Premium', '2025-01-15', '2025-04-15', 'active', 'unpaid', 15000.00),
('5JA05', 'Vikram Singh', 'vikram.singh@email.com', '+91 9876543214', 'Basic', '2025-01-18', '2025-02-18', 'expired', 'unpaid', 5000.00),

-- February 2025 members
('5FE01', 'Anjali Mehta', 'anjali.mehta@email.com', '+91 9876543215', 'Platinum', '2025-02-01', '2026-02-01', 'active', 'paid', 50000.00),
('5FE02', 'Rahul Verma', 'rahul.verma@email.com', '+91 9876543216', 'Premium', '2025-02-03', '2025-05-03', 'active', 'paid', 15000.00),
('5FE03', 'Kavita Nair', 'kavita.nair@email.com', '+91 9876543217', 'Basic', '2025-02-05', '2025-03-05', 'active', 'paid', 5000.00),
('5FE04', 'Mohit Agarwal', 'mohit.agarwal@email.com', '+91 9876543218', 'Gold', '2025-02-08', '2025-08-08', 'active', 'unpaid', 30000.00),
('5FE05', 'Divya Joshi', 'divya.joshi@email.com', '+91 9876543219', 'Premium', '2025-02-10', '2025-05-10', 'active', 'paid', 15000.00),
('5FE06', 'Arjun Desai', 'arjun.desai@email.com', '+91 9876543220', 'Basic', '2025-02-12', '2025-03-12', 'inactive', 'paid', 5000.00),
('5FE07', 'Meera Iyer', 'meera.iyer@email.com', '+91 9876543221', 'Platinum', '2025-02-15', '2026-02-15', 'active', 'paid', 50000.00),

-- March 2025 members
('5MR01', 'Suresh Menon', 'suresh.menon@email.com', '+91 9876543222', 'Gold', '2025-03-01', '2025-09-01', 'active', 'paid', 30000.00),
('5MR02', 'Lakshmi Rao', 'lakshmi.rao@email.com', '+91 9876543223', 'Premium', '2025-03-03', '2025-06-03', 'active', 'paid', 15000.00),
('5MR03', 'Nikhil Gupta', 'nikhil.gupta@email.com', '+91 9876543224', 'Basic', '2025-03-05', '2025-04-05', 'active', 'unpaid', 5000.00),
('5MR04', 'Pooja Shah', 'pooja.shah@email.com', '+91 9876543225', 'Premium', '2025-03-08', '2025-06-08', 'active', 'paid', 15000.00),
('5MR05', 'Ravi Krishnan', 'ravi.krishnan@email.com', '+91 9876543226', 'Gold', '2025-03-10', '2025-09-10', 'active', 'paid', 30000.00),
('5MR06', 'Swati Malhotra', 'swati.malhotra@email.com', '+91 9876543227', 'Basic', '2025-03-12', '2025-04-12', 'expired', 'unpaid', 5000.00),
('5MR07', 'Aditya Kapoor', 'aditya.kapoor@email.com', '+91 9876543228', 'Platinum', '2025-03-15', '2026-03-15', 'active', 'paid', 50000.00),
('5MR08', 'Neha Chaturvedi', 'neha.chaturvedi@email.com', '+91 9876543229', 'Premium', '2025-03-18', '2025-06-18', 'active', 'unpaid', 15000.00),

-- April 2025 members
('5AP01', 'Karan Thakur', 'karan.thakur@email.com', '+91 9876543230', 'Gold', '2025-04-01', '2025-10-01', 'active', 'paid', 30000.00),
('5AP02', 'Riya Banerjee', 'riya.banerjee@email.com', '+91 9876543231', 'Premium', '2025-04-03', '2025-07-03', 'active', 'paid', 15000.00),
('5AP03', 'Varun Mishra', 'varun.mishra@email.com', '+91 9876543232', 'Basic', '2025-04-05', '2025-05-05', 'active', 'paid', 5000.00),
('5AP04', 'Anita Das', 'anita.das@email.com', '+91 9876543233', 'Premium', '2025-04-08', '2025-07-08', 'active', 'paid', 15000.00),
('5AP05', 'Siddharth Rana', 'siddharth.rana@email.com', '+91 9876543234', 'Gold', '2025-04-10', '2025-10-10', 'active', 'unpaid', 30000.00),
('5AP06', 'Tanya Oberoi', 'tanya.oberoi@email.com', '+91 9876543235', 'Platinum', '2025-04-12', '2026-04-12', 'active', 'paid', 50000.00),
('5AP07', 'Rohan Bansal', 'rohan.bansal@email.com', '+91 9876543236', 'Basic', '2025-04-15', '2025-05-15', 'inactive', 'paid', 5000.00),

-- May 2025 members
('5MY01', 'Isha Tripathi', 'isha.tripathi@email.com', '+91 9876543237', 'Premium', '2025-05-01', '2025-08-01', 'active', 'paid', 15000.00),
('5MY02', 'Yash Goel', 'yash.goel@email.com', '+91 9876543238', 'Gold', '2025-05-03', '2025-11-03', 'active', 'paid', 30000.00),
('5MY03', 'Shreya Agarwal', 'shreya.agarwal@email.com', '+91 9876543239', 'Basic', '2025-05-05', '2025-06-05', 'active', 'paid', 5000.00),
('5MY04', 'Harsh Varma', 'harsh.varma@email.com', '+91 9876543240', 'Premium', '2025-05-08', '2025-08-08', 'active', 'unpaid', 15000.00),
('5MY05', 'Aishwarya Nair', 'aishwarya.nair@email.com', '+91 9876543241', 'Platinum', '2025-05-10', '2026-05-10', 'active', 'paid', 50000.00),
('5MY06', 'Kunal Mehta', 'kunal.mehta@email.com', '+91 9876543242', 'Gold', '2025-05-12', '2025-11-12', 'active', 'paid', 30000.00),
('5MY07', 'Ritika Singh', 'ritika.singh@email.com', '+91 9876543243', 'Basic', '2025-05-15', '2025-06-15', 'expired', 'unpaid', 5000.00),

-- June 2025 members
('5JN01', 'Abhishek Reddy', 'abhishek.reddy@email.com', '+91 9876543244', 'Premium', '2025-06-01', '2025-09-01', 'active', 'paid', 15000.00),
('5JN02', 'Manisha Patel', 'manisha.patel@email.com', '+91 9876543245', 'Gold', '2025-06-03', '2025-12-03', 'active', 'paid', 30000.00),
('5JN03', 'Vivek Kumar', 'vivek.kumar@email.com', '+91 9876543246', 'Basic', '2025-06-05', '2025-07-05', 'active', 'paid', 5000.00),
('5JN04', 'Deepika Sharma', 'deepika.sharma@email.com', '+91 9876543247', 'Premium', '2025-06-08', '2025-09-08', 'active', 'paid', 15000.00),
('5JN05', 'Rishabh Joshi', 'rishabh.joshi@email.com', '+91 9876543248', 'Platinum', '2025-06-10', '2026-06-10', 'active', 'paid', 50000.00),
('5JN06', 'Sakshi Verma', 'sakshi.verma@email.com', '+91 9876543249', 'Gold', '2025-06-12', '2025-12-12', 'active', 'unpaid', 30000.00),
('5JN07', 'Aman Desai', 'aman.desai@email.com', '+91 9876543250', 'Basic', '2025-06-15', '2025-07-15', 'inactive', 'paid', 5000.00),

-- July 2025 members
('5JL01', 'Preeti Iyer', 'preeti.iyer@email.com', '+91 9876543251', 'Premium', '2025-07-01', '2025-10-01', 'active', 'paid', 15000.00),
('5JL02', 'Gaurav Menon', 'gaurav.menon@email.com', '+91 9876543252', 'Gold', '2025-07-03', '2026-01-03', 'active', 'paid', 30000.00),
('5JL03', 'Jyoti Rao', 'jyoti.rao@email.com', '+91 9876543253', 'Basic', '2025-07-05', '2025-08-05', 'active', 'paid', 5000.00),
('5JL04', 'Saurabh Gupta', 'saurabh.gupta@email.com', '+91 9876543254', 'Premium', '2025-07-08', '2025-10-08', 'active', 'unpaid', 15000.00),
('5JL05', 'Nisha Shah', 'nisha.shah@email.com', '+91 9876543255', 'Platinum', '2025-07-10', '2026-07-10', 'active', 'paid', 50000.00),
('5JL06', 'Rajat Krishnan', 'rajat.krishnan@email.com', '+91 9876543256', 'Gold', '2025-07-12', '2026-01-12', 'active', 'paid', 30000.00),
('5JL07', 'Urvashi Malhotra', 'urvashi.malhotra@email.com', '+91 9876543257', 'Basic', '2025-07-15', '2025-08-15', 'expired', 'unpaid', 5000.00),

-- August 2025 members
('5AU01', 'Kiran Kapoor', 'kiran.kapoor@email.com', '+91 9876543258', 'Premium', '2025-08-01', '2025-11-01', 'active', 'paid', 15000.00),
('5AU02', 'Rohit Chaturvedi', 'rohit.chaturvedi@email.com', '+91 9876543259', 'Gold', '2025-08-03', '2026-02-03', 'active', 'paid', 30000.00),
('5AU03', 'Sunita Thakur', 'sunita.thakur@email.com', '+91 9876543260', 'Basic', '2025-08-05', '2025-09-05', 'active', 'paid', 5000.00),
('5AU04', 'Ankit Banerjee', 'ankit.banerjee@email.com', '+91 9876543261', 'Premium', '2025-08-08', '2025-11-08', 'active', 'paid', 15000.00),
('5AU05', 'Pallavi Mishra', 'pallavi.mishra@email.com', '+91 9876543262', 'Platinum', '2025-08-10', '2026-08-10', 'active', 'paid', 50000.00),
('5AU06', 'Sandeep Das', 'sandeep.das@email.com', '+91 9876543263', 'Gold', '2025-08-12', '2026-02-12', 'active', 'unpaid', 30000.00),
('5AU07', 'Monika Rana', 'monika.rana@email.com', '+91 9876543264', 'Basic', '2025-08-15', '2025-09-15', 'inactive', 'paid', 5000.00),

-- September 2025 members
('5SE01', 'Vikrant Oberoi', 'vikrant.oberoi@email.com', '+91 9876543265', 'Premium', '2025-09-01', '2025-12-01', 'active', 'paid', 15000.00),
('5SE02', 'Radhika Bansal', 'radhika.bansal@email.com', '+91 9876543266', 'Gold', '2025-09-03', '2026-03-03', 'active', 'paid', 30000.00),
('5SE03', 'Naveen Tripathi', 'naveen.tripathi@email.com', '+91 9876543267', 'Basic', '2025-09-05', '2025-10-05', 'active', 'paid', 5000.00),
('5SE04', 'Shilpa Goel', 'shilpa.goel@email.com', '+91 9876543268', 'Premium', '2025-09-08', '2025-12-08', 'active', 'unpaid', 15000.00),
('5SE05', 'Manoj Agarwal', 'manoj.agarwal@email.com', '+91 9876543269', 'Platinum', '2025-09-10', '2026-09-10', 'active', 'paid', 50000.00),
('5SE06', 'Kavya Varma', 'kavya.varma@email.com', '+91 9876543270', 'Gold', '2025-09-12', '2026-03-12', 'active', 'paid', 30000.00),
('5SE07', 'Dinesh Nair', 'dinesh.nair@email.com', '+91 9876543271', 'Basic', '2025-09-15', '2025-10-15', 'expired', 'unpaid', 5000.00),

-- October 2025 members
('5OC01', 'Rekha Mehta', 'rekha.mehta@email.com', '+91 9876543272', 'Premium', '2025-10-01', '2026-01-01', 'active', 'paid', 15000.00),
('5OC02', 'Sachin Verma', 'sachin.verma@email.com', '+91 9876543273', 'Gold', '2025-10-03', '2026-04-03', 'active', 'paid', 30000.00),
('5OC03', 'Madhuri Joshi', 'madhuri.joshi@email.com', '+91 9876543274', 'Basic', '2025-10-05', '2025-11-05', 'active', 'paid', 5000.00),
('5OC04', 'Pramod Desai', 'pramod.desai@email.com', '+91 9876543275', 'Premium', '2025-10-08', '2026-01-08', 'active', 'paid', 15000.00),
('5OC05', 'Anushka Iyer', 'anushka.iyer@email.com', '+91 9876543276', 'Platinum', '2025-10-10', '2026-10-10', 'active', 'paid', 50000.00),
('5OC06', 'Ramesh Menon', 'ramesh.menon@email.com', '+91 9876543277', 'Gold', '2025-10-12', '2026-04-12', 'active', 'unpaid', 30000.00),
('5OC07', 'Suman Rao', 'suman.rao@email.com', '+91 9876543278', 'Basic', '2025-10-15', '2025-11-15', 'inactive', 'paid', 5000.00),

-- November 2025 members
('5NO01', 'Vijay Gupta', 'vijay.gupta@email.com', '+91 9876543279', 'Premium', '2025-11-01', '2026-02-01', 'active', 'paid', 15000.00),
('5NO02', 'Lata Shah', 'lata.shah@email.com', '+91 9876543280', 'Gold', '2025-11-03', '2026-05-03', 'active', 'paid', 30000.00),
('5NO03', 'Ajay Krishnan', 'ajay.krishnan@email.com', '+91 9876543281', 'Basic', '2025-11-05', '2025-12-05', 'active', 'paid', 5000.00),
('5NO04', 'Geeta Malhotra', 'geeta.malhotra@email.com', '+91 9876543282', 'Premium', '2025-11-08', '2026-02-08', 'active', 'unpaid', 15000.00),
('5NO05', 'Rajesh Kapoor', 'rajesh.kapoor@email.com', '+91 9876543283', 'Platinum', '2025-11-10', '2026-11-10', 'active', 'paid', 50000.00),
('5NO06', 'Sarita Chaturvedi', 'sarita.chaturvedi@email.com', '+91 9876543284', 'Gold', '2025-11-12', '2026-05-12', 'active', 'paid', 30000.00),
('5NO07', 'Mahesh Thakur', 'mahesh.thakur@email.com', '+91 9876543285', 'Basic', '2025-11-15', '2025-12-15', 'expired', 'unpaid', 5000.00),

-- December 2025 members
('5DE01', 'Kamala Banerjee', 'kamala.banerjee@email.com', '+91 9876543286', 'Premium', '2025-12-01', '2026-03-01', 'active', 'paid', 15000.00),
('5DE02', 'Suresh Mishra', 'suresh.mishra@email.com', '+91 9876543287', 'Gold', '2025-12-03', '2026-06-03', 'active', 'paid', 30000.00),
('5DE03', 'Indira Das', 'indira.das@email.com', '+91 9876543288', 'Basic', '2025-12-05', '2026-01-05', 'active', 'paid', 5000.00),
('5DE04', 'Bharat Rana', 'bharat.rana@email.com', '+91 9876543289', 'Premium', '2025-12-08', '2026-03-08', 'active', 'paid', 15000.00),
('5DE05', 'Lakshmi Oberoi', 'lakshmi.oberoi@email.com', '+91 9876543290', 'Platinum', '2025-12-10', '2026-12-10', 'active', 'paid', 50000.00),
('5DE06', 'Gopal Bansal', 'gopal.bansal@email.com', '+91 9876543291', 'Gold', '2025-12-12', '2026-06-12', 'active', 'unpaid', 30000.00),
('5DE07', 'Sita Tripathi', 'sita.tripathi@email.com', '+91 9876543292', 'Basic', '2025-12-15', '2026-01-15', 'inactive', 'paid', 5000.00),

-- Some expired and inactive members from previous months (for testing)
('4DE15', 'Old Member One', 'old.member1@email.com', '+91 9876543293', 'Basic', '2024-12-20', '2025-01-20', 'expired', 'unpaid', 5000.00),
('4DE16', 'Old Member Two', 'old.member2@email.com', '+91 9876543294', 'Premium', '2024-12-22', '2025-03-22', 'expired', 'paid', 15000.00),
('4NO20', 'Inactive Member', 'inactive.member@email.com', '+91 9876543295', 'Gold', '2024-11-25', '2025-05-25', 'inactive', 'paid', 30000.00);

-- Verify the data
-- SELECT COUNT(*) as total_members FROM members;
-- SELECT status, COUNT(*) FROM members GROUP BY status;
-- SELECT payment_status, COUNT(*) FROM members GROUP BY payment_status;
-- SELECT membership_type, COUNT(*) FROM members GROUP BY membership_type;
