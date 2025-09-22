export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'supervisor' | 'admin';
  department?: string;
  matricNumber?: string;
  specialization?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  supervisorId?: {
    _id: string;
    name: string;
  };
  supervisor?: string;
  department: string;
  duration?: string;
  requirements?: string;
  status: 'available' | 'full' | 'completed';
  maxStudents: number;
  currentStudents: number;
  createdAt: string;
}

export interface Allocation {
  _id: string;
  studentId?: {
    _id: string;
    name: string;
    email: string;
    matricNumber?: string;
  };
  projectId?: {
    _id: string;
    title: string;
    description: string;
    department: string;
  };
  supervisorId?: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export interface ProgressReport {
  _id: string;
  studentId?: {
    _id: string;
    name: string;
  };
  projectId?: {
    _id: string;
    title: string;
  };
  report: string;
  submissionDate: string;
  feedback?: string;
}

export interface Student {
  _id: string;
  name: string;
  email: string;
  matricNumber: string;
  department: string;
  preference?: string;
  assignedProject?: Project;
  createdAt: string;
}

export interface Supervisor {
  _id: string;
  name: string;
  email: string;
  department: string;
  specialization: string;
  projectsCount: number;
  createdAt: string;
}
