
// Company (tenant) type definition
export type Company = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  createdAt: Date;
};

// User types and roles
export type UserRole = 'admin' | 'coordinator' | 'scanner' | 'client' | 'supervisor' | 'receptionist';

export type User = {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
};

// Client specific type
export type Client = {
  id: string;
  companyId: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: Date;
};

// Job status options
export type JobStatus = 
  | 'requested'
  | 'confirmed'
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

// Job/booking type
export type Job = {
  id: string;
  companyId: string;
  clientId: string;
  title: string;
  description: string;
  location: string;
  scheduledDate: Date;
  estimatedDuration: number; // in hours
  status: JobStatus;
  assignedUsers: {
    coordinatorId?: string;
    scannerId?: string;
    supervisorId?: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};
