
-- Staff table
CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  image TEXT,
  status TEXT CHECK (status IN ('Active', 'On Leave', 'Inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE certifications (
  id SERIAL PRIMARY KEY,
  staff_id INTEGER REFERENCES staff(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  expires DATE NOT NULL,
  status TEXT CHECK (status IN ('Active', 'Expiring Soon', 'Expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Training modules table
CREATE TABLE training_modules (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  completion INTEGER CHECK (completion >= 0 AND completion <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Staff training progress
CREATE TABLE staff_training (
  id SERIAL PRIMARY KEY,
  staff_id INTEGER REFERENCES staff(id) ON DELETE CASCADE,
  training_id INTEGER REFERENCES training_modules(id) ON DELETE CASCADE,
  completion INTEGER CHECK (completion >= 0 AND completion <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(staff_id, training_id)
);

-- Payroll records
CREATE TABLE payroll (
  id SERIAL PRIMARY KEY,
  staff_id INTEGER REFERENCES staff(id) ON DELETE CASCADE,
  period TEXT NOT NULL,
  salary TEXT NOT NULL,
  hours INTEGER NOT NULL,
  overtime INTEGER DEFAULT 0,
  bonus TEXT,
  status TEXT CHECK (status IN ('Paid', 'Pending')),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tasks
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  staff_id INTEGER REFERENCES staff(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('Pending', 'In Progress', 'Completed')),
  priority TEXT CHECK (priority IN ('High', 'Medium', 'Low')),
  due_date DATE NOT NULL,
  estimated_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Shift schedules
CREATE TABLE shift_schedules (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  shift_type TEXT CHECK (shift_type IN ('Morning', 'Afternoon', 'Evening')),
  staff_ids INTEGER[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pickup schedule
CREATE TABLE pickups (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  serviceType TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample data: Staff
INSERT INTO staff (name, role, email, phone, image, status)
VALUES 
  ('John Doe', 'Laundry Manager', 'john.doe@laundry.com', '(555) 123-4567', '/placeholder.svg', 'Active'),
  ('Jane Smith', 'Senior Washing Specialist', 'jane.smith@laundry.com', '(555) 234-5678', '/placeholder.svg', 'Active'),
  ('Robert Johnson', 'Ironing Specialist', 'robert.johnson@laundry.com', '(555) 345-6789', '/placeholder.svg', 'On Leave');

-- Sample data: Certifications
INSERT INTO certifications (staff_id, title, date, expires, status)
VALUES 
  (1, 'Advanced Fabric Care', '2022-05-12', '2024-05-12', 'Active'),
  (1, 'Workplace Safety', '2022-02-08', '2024-02-08', 'Active'),
  (1, 'Customer Service Excellence', '2021-11-15', '2023-11-15', 'Expiring Soon'),
  (2, 'Eco-Friendly Cleaning Practices', '2022-07-20', '2024-07-20', 'Active'),
  (2, 'Stain Removal Specialist', '2023-01-10', '2025-01-10', 'Active'),
  (3, 'Industrial Pressing Techniques', '2022-04-05', '2024-04-05', 'Active'),
  (3, 'Workplace Safety', '2021-09-30', '2023-09-30', 'Expired');

-- Sample data: Training modules
INSERT INTO training_modules (title, description, duration, completion)
VALUES 
  ('Delicate Fabric Handling', 'Learn how to handle and clean delicate fabrics', '2 hours', 80),
  ('Commercial Laundry Equipment', 'Operating and maintaining commercial laundry equipment', '4 hours', 100),
  ('Stain Removal Techniques', 'Advanced techniques for removing difficult stains', '3 hours', 60),
  ('Eco-Friendly Practices', 'Implementing environmentally friendly laundry practices', '2 hours', 40),
  ('Customer Service Skills', 'Improving customer service and handling complaints', '2.5 hours', 90);

-- Sample data: Pickups
INSERT INTO pickups (name, phone, email, address, serviceType, pickup_date, time, notes, status)
VALUES
  ('Alice Johnson', '(555) 987-6543', 'alice@example.com', '123 Main St, Anytown', 'standard', '2023-11-15', '13:00', 'Ring bell twice', 'Completed'),
  ('Bob Williams', '(555) 456-7890', 'bob@example.com', '456 Oak Ave, Somewhere', 'express', '2023-11-17', '10:00', 'Heavy items included', 'Completed'),
  ('Carol Brown', '(555) 321-6547', 'carol@example.com', '789 Pine Rd, Nowhere', 'premium', '2023-11-20', '14:00', 'Fragile clothes', 'Confirmed');
