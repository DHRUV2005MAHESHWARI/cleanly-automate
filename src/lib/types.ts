
export interface Staff {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  created_at?: string;
}

export interface Certification {
  id: number;
  staff_id: number;
  title: string;
  date: string;
  expires: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  created_at?: string;
}

export interface TrainingModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  completion: number;
  created_at?: string;
}

export interface StaffTraining {
  id: number;
  staff_id: number;
  training_id: number;
  completion: number;
  created_at?: string;
}

export interface PayrollRecord {
  id: number;
  staff_id: number;
  period: string;
  salary: string;
  hours: number;
  overtime: number;
  bonus: string;
  status: 'Paid' | 'Pending';
  date: string;
  created_at?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  staff_id: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  due_date: string;
  estimated_time: string;
  created_at?: string;
}

export interface ShiftSchedule {
  id: number;
  day: string;
  shift_type: 'Morning' | 'Afternoon' | 'Evening';
  staff_ids: number[];
  created_at?: string;
}

export interface Pickup {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  pickup_date: string;
  time: string;
  notes?: string;
  status?: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at?: string;
}
