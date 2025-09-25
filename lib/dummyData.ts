import { User, Student, Supervisor, Project, Allocation, Progress } from '../types';

// Helper function to generate IDs
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Create initial dummy data
export const dummyData: {
  users: User[];
  students: Student[];
  supervisors: Supervisor[];
  projects: Project[];
  allocations: Allocation[];
  progress: Progress[];
} = {
  users: [
    {
      _id: 'admin1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date('2024-01-01').toISOString(),
    },
    {
      _id: 'supervisor1',
      name: 'Dr. Jane Smith',
      email: 'jane.smith@example.com',
      role: 'supervisor',
      department: 'Computer Science',
      specialization: 'AI and Machine Learning',
      isActive: true,
      createdAt: new Date('2024-01-02').toISOString(),
      updatedAt: new Date('2024-01-02').toISOString(),
    },
    {
      _id: 'supervisor2',
      name: 'Prof. Michael Johnson',
      email: 'michael.johnson@example.com',
      role: 'supervisor',
      department: 'Engineering',
      specialization: 'Energy Systems',
      isActive: true,
      createdAt: new Date('2024-01-03').toISOString(),
      updatedAt: new Date('2024-01-03').toISOString(),
    },
    {
      _id: 'supervisor3',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'supervisor',
      department: 'Cybersecurity',
      specialization: 'Blockchain Security',
      isActive: true,
      createdAt: new Date('2024-01-04').toISOString(),
      updatedAt: new Date('2024-01-04').toISOString(),
    },
    {
      _id: 'student1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'student',
      department: 'Computer Science',
      matricNumber: 'CS2024001',
      isActive: true,
      createdAt: new Date('2024-01-05').toISOString(),
      updatedAt: new Date('2024-01-05').toISOString(),
    },
    {
      _id: 'student2',
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'student',
      department: 'Engineering',
      matricNumber: 'ENG2024001',
      isActive: true,
      createdAt: new Date('2024-01-06').toISOString(),
      updatedAt: new Date('2024-01-06').toISOString(),
    },
    {
      _id: 'student3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      role: 'student',
      department: 'Cybersecurity',
      matricNumber: 'CS2024002',
      isActive: true,
      createdAt: new Date('2024-01-07').toISOString(),
      updatedAt: new Date('2024-01-07').toISOString(),
    }
  ],
  
  students: [
    {
      _id: 'student1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      matricNumber: 'CS2024001',
      department: 'Computer Science',
      preference: 'AI and Machine Learning',
      assignedProject: 'project1',
      createdAt: new Date('2024-01-05').toISOString(),
      updatedAt: new Date('2024-01-05').toISOString(),
    },
    {
      _id: 'student2',
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      matricNumber: 'ENG2024001',
      department: 'Engineering',
      preference: 'Energy Systems',
      createdAt: new Date('2024-01-06').toISOString(),
      updatedAt: new Date('2024-01-06').toISOString(),
    },
    {
      _id: 'student3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      matricNumber: 'CS2024002',
      department: 'Cybersecurity',
      preference: 'Blockchain Security',
      assignedProject: 'project3',
      createdAt: new Date('2024-01-07').toISOString(),
      updatedAt: new Date('2024-01-07').toISOString(),
    },
    {
      _id: 'student4',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      matricNumber: 'CS2024003',
      department: 'Computer Science',
      preference: 'Web Development',
      createdAt: new Date('2024-01-08').toISOString(),
      updatedAt: new Date('2024-01-08').toISOString(),
    },
    {
      _id: 'student5',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      matricNumber: 'ENG2024002',
      department: 'Engineering',
      preference: 'Robotics',
      createdAt: new Date('2024-01-09').toISOString(),
      updatedAt: new Date('2024-01-09').toISOString(),
    }
  ],
  
  supervisors: [
    {
      _id: 'supervisor1',
      name: 'Dr. Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Computer Science',
      specialization: 'AI and Machine Learning',
      projectsCount: 2,
      createdAt: new Date('2024-01-02').toISOString(),
      updatedAt: new Date('2024-01-02').toISOString(),
    },
    {
      _id: 'supervisor2',
      name: 'Prof. Michael Johnson',
      email: 'michael.johnson@example.com',
      department: 'Engineering',
      specialization: 'Energy Systems',
      projectsCount: 1,
      createdAt: new Date('2024-01-03').toISOString(),
      updatedAt: new Date('2024-01-03').toISOString(),
    },
    {
      _id: 'supervisor3',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@example.com',
      department: 'Cybersecurity',
      specialization: 'Blockchain Security',
      projectsCount: 1,
      createdAt: new Date('2024-01-04').toISOString(),
      updatedAt: new Date('2024-01-04').toISOString(),
    }
  ],
  
  projects: [
    {
      _id: 'project1',
      title: 'AI-Powered Healthcare System',
      description: 'Develop an AI system for medical diagnosis assistance using machine learning algorithms.',
      supervisorId: 'supervisor1',
      status: 'assigned',
      department: 'Computer Science',
      currentStudents: 1,
      maxStudents: 3,
      duration: '6 months',
      requirements: 'Python, Machine Learning, Healthcare domain knowledge',
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-15').toISOString(),
    },
    {
      _id: 'project2',
      title: 'Natural Language Processing for Education',
      description: 'Create an NLP system to assist in educational content creation and assessment.',
      supervisorId: 'supervisor1',
      status: 'available',
      department: 'Computer Science',
      currentStudents: 0,
      maxStudents: 2,
      duration: '4 months',
      requirements: 'NLP, Python, Education background preferred',
      createdAt: new Date('2024-01-16').toISOString(),
      updatedAt: new Date('2024-01-16').toISOString(),
    },
    {
      _id: 'project3',
      title: 'Blockchain Security Analysis',
      description: 'Analyze security vulnerabilities in blockchain networks and develop mitigation strategies.',
      supervisorId: 'supervisor3',
      status: 'assigned',
      department: 'Cybersecurity',
      currentStudents: 1,
      maxStudents: 2,
      duration: '5 months',
      requirements: 'Cryptography, Network Security, Programming',
      createdAt: new Date('2024-01-20').toISOString(),
      updatedAt: new Date('2024-01-20').toISOString(),
    },
    {
      _id: 'project4',
      title: 'Sustainable Energy Optimization',
      description: 'Research and develop algorithms for optimizing renewable energy distribution in smart grids.',
      supervisorId: 'supervisor2',
      status: 'available',
      department: 'Engineering',
      currentStudents: 0,
      maxStudents: 4,
      duration: '8 months',
      requirements: 'Mathematics, Programming, Energy systems knowledge',
      createdAt: new Date('2024-01-10').toISOString(),
      updatedAt: new Date('2024-01-10').toISOString(),
    },
    {
      _id: 'project5',
      title: 'Autonomous Drone Navigation',
      description: 'Develop algorithms for autonomous drone navigation in complex environments.',
      supervisorId: 'supervisor2',
      status: 'full',
      department: 'Engineering',
      currentStudents: 3,
      maxStudents: 3,
      duration: '7 months',
      requirements: 'Computer Vision, Robotics, C++/Python',
      createdAt: new Date('2024-01-12').toISOString(),
      updatedAt: new Date('2024-01-12').toISOString(),
    }
  ],
  
  allocations: [
    {
      _id: 'allocation1',
      studentId: 'student1',
      projectId: 'project1',
      supervisorId: 'supervisor1',
      createdAt: new Date('2024-02-01').toISOString(),
      updatedAt: new Date('2024-02-01').toISOString(),
    },
    {
      _id: 'allocation2',
      studentId: 'student3',
      projectId: 'project3',
      supervisorId: 'supervisor3',
      createdAt: new Date('2024-02-03').toISOString(),
      updatedAt: new Date('2024-02-03').toISOString(),
    }
  ],
  
  progress: [
    {
      _id: 'progress1',
      studentId: 'student1',
      projectId: 'project1',
      report: 'I have completed the initial research phase and started implementing the machine learning model. Currently working on data preprocessing and feature selection.',
      submissionDate: new Date('2024-03-01').toISOString(),
      feedback: 'Good progress. Consider exploring more recent research papers on feature selection techniques for healthcare data.',
      createdAt: new Date('2024-03-01').toISOString(),
      updatedAt: new Date('2024-03-02').toISOString(),
    },
    {
      _id: 'progress2',
      studentId: 'student3',
      projectId: 'project3',
      report: 'I have analyzed three different blockchain protocols and identified common security vulnerabilities. Currently working on developing a testing framework for automated vulnerability detection.',
      submissionDate: new Date('2024-03-05').toISOString(),
      createdAt: new Date('2024-03-05').toISOString(),
      updatedAt: new Date('2024-03-05').toISOString(),
    }
  ]
};

// Add password hashes to users
(async () => {
  const defaultPassword = 'password123';

  dummyData.users = dummyData.users.map(user => ({
    ...user,
    password: `hashed:${defaultPassword}`
  }));
})();

// Function to get all items from a collection
export const getAll = <T>(collection: string): T[] => {
  return [...(dummyData[collection as keyof typeof dummyData] as unknown as T[])];
};

// Function to get a single item by ID
export const getById = <T extends { _id: string }>(collection: string, id: string): T | null => {
  const items = dummyData[collection as keyof typeof dummyData] as unknown as T[];
  return items.find(item => item._id === id) || null;
};

// Function to find items by query
export const find = <T>(collection: string, query: Record<string, unknown>): T[] => {
  const items = dummyData[collection as keyof typeof dummyData] as unknown as T[];
  
  if (Object.keys(query).length === 0) {
    return [...items];
  }
  
  return items.filter(item => {
    return Object.entries(query).every(([key, value]) => {
      // Handle special queries like $in, $eq, etc. if needed
      if (key.startsWith('$')) {
        // For now, we'll just handle simple cases
        return true;
      }
      
      // Handle nested fields with dot notation
      if (key.includes('.')) {
        const parts = key.split('.');
        let nestedValue: unknown = item;
        for (const part of parts) {
          if (nestedValue && typeof nestedValue === 'object') {
            nestedValue = (nestedValue as Record<string, unknown>)[part];
          } else {
            return false;
          }
        }
        return nestedValue === value;
      }
      
      return (item as Record<string, unknown>)[key] === value;
    });
  });
};

// Function to find one item by query
export const findOne = <T>(collection: string, query: Record<string, unknown>): T | null => {
  const results = find<T>(collection, query);
  return results.length > 0 ? results[0] : null;
};

// Function to create a new item
export const create = <T extends { _id?: string }>(collection: string, data: Partial<T>): T => {
  const newItem = {
    _id: data._id || generateId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } as unknown as T;
  
  (dummyData[collection as keyof typeof dummyData] as unknown as T[]).push(newItem);
  return newItem;
};

// Function to update an item
export const updateById = <T extends { _id: string }>(collection: string, id: string, data: Partial<T>): T | null => {
  const items = dummyData[collection as keyof typeof dummyData] as unknown as T[];
  const index = items.findIndex(item => item._id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedItem = {
    ...items[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  items[index] = updatedItem;
  return updatedItem;
};

// Function to delete an item
export const deleteById = <T extends { _id: string }>(collection: string, id: string): boolean => {
  const items = dummyData[collection as keyof typeof dummyData] as unknown as T[];
  const initialLength = items.length;
  
  const filteredItems = items.filter(item => item._id !== id);
  (dummyData[collection as keyof typeof dummyData] as unknown as T[]) = filteredItems;
  
  return filteredItems.length < initialLength;
};

// Function to compare password (for authentication)
export const comparePassword = async (providedPassword: string, storedPassword: string): Promise<boolean> => {
  // For mock database, check if the stored password matches our format
  return storedPassword === `hashed:${providedPassword}` || providedPassword === storedPassword;
};
