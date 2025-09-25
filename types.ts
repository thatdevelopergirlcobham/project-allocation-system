export type UserRole = 'admin' | 'supervisor' | 'student';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  matricNumber?: string;
  specialization?: string;
  isActive: boolean;
  isAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  _id: string;
  name: string;
  matricNumber: string;
  email: string;
  department: string;
  preference?: string;
  assignedProject?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Supervisor {
  _id: string;
  name: string;
  email: string;
  department: string;
  specialization?: string;
  projectsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  supervisorId: string | Supervisor;
  status: 'available' | 'assigned' | 'completed' | 'full';
  department?: string;
  currentStudents?: number;
  maxStudents?: number;
  createdAt?: string;
  updatedAt?: string;
  duration?: string;
  requirements?: string;
}

export interface Allocation {
  _id: string;
  studentId: string | Student;
  projectId: string | Project;
  supervisorId: string | Supervisor;
  createdAt?: string;
  updatedAt?: string;
}

export interface Progress {
  _id: string;
  studentId: string | Student;
  projectId: string | Project;
  report: string;
  submissionDate: string;
  feedback?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Alias for Progress to match the component usage
export type ProgressReport = Progress;

export interface AuthResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
  details?: string | string[];
}
