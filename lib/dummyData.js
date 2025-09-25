// Comprehensive dummy data for the Project Allocation System
// This file contains all data and functions needed for the application

// Helper function to generate unique IDs
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper function to hash passwords (for demo purposes)
const hashPassword = async (password) => {
  return `hashed:${password}`;
};

// Initial dummy data
export const dummyData = {
  users: [
    {
      _id: 'admin1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'hashed:password123',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date('2024-01-01').toISOString(),
    },
    {
      _id: 'supervisor1',
      name: 'Dr. Jane Smith',
      email: 'jane.smith@example.com',
      password: 'hashed:password123',
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
      password: 'hashed:password123',
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
      password: 'hashed:password123',
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
      password: 'hashed:password123',
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
      password: 'hashed:password123',
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
      password: 'hashed:password123',
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
      role: 'student',
      isActive: true,
      preference: 'AI and Machine Learning projects',
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
      role: 'student',
      isActive: true,
      preference: 'Sustainable Energy projects',
      assignedProject: 'project2',
      createdAt: new Date('2024-01-06').toISOString(),
      updatedAt: new Date('2024-01-06').toISOString(),
    },
    {
      _id: 'student3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      matricNumber: 'CS2024002',
      department: 'Cybersecurity',
      role: 'student',
      isActive: true,
      preference: 'Cybersecurity and blockchain projects',
      assignedProject: null,
      createdAt: new Date('2024-01-07').toISOString(),
      updatedAt: new Date('2024-01-07').toISOString(),
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
      isActive: true,
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
      isActive: true,
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
      isActive: true,
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
      title: 'Renewable Energy Optimization',
      description: 'Design and implement optimization algorithms for renewable energy systems.',
      supervisorId: 'supervisor2',
      status: 'assigned',
      department: 'Engineering',
      currentStudents: 1,
      maxStudents: 2,
      duration: '4 months',
      requirements: 'Engineering background, Optimization algorithms',
      createdAt: new Date('2024-01-16').toISOString(),
      updatedAt: new Date('2024-01-16').toISOString(),
    },
    {
      _id: 'project3',
      title: 'Blockchain Security Analysis',
      description: 'Analyze security vulnerabilities in blockchain systems and develop mitigation strategies.',
      supervisorId: 'supervisor3',
      status: 'available',
      department: 'Cybersecurity',
      currentStudents: 0,
      maxStudents: 2,
      duration: '5 months',
      requirements: 'Cybersecurity knowledge, Blockchain technology',
      createdAt: new Date('2024-01-17').toISOString(),
      updatedAt: new Date('2024-01-17').toISOString(),
    },
    {
      _id: 'project4',
      title: 'Natural Language Processing for Education',
      description: 'Create an NLP system to assist in educational content creation and analysis.',
      supervisorId: 'supervisor1',
      status: 'available',
      department: 'Computer Science',
      currentStudents: 0,
      maxStudents: 2,
      duration: '4 months',
      requirements: 'NLP, Python, Education background preferred',
      createdAt: new Date('2024-01-18').toISOString(),
      updatedAt: new Date('2024-01-18').toISOString(),
    }
  ],
  allocations: [
    {
      _id: 'allocation1',
      studentId: 'student1',
      projectId: 'project1',
      supervisorId: 'supervisor1',
      createdAt: new Date('2024-01-20').toISOString(),
      updatedAt: new Date('2024-01-20').toISOString(),
    },
    {
      _id: 'allocation2',
      studentId: 'student2',
      projectId: 'project2',
      supervisorId: 'supervisor2',
      createdAt: new Date('2024-01-21').toISOString(),
      updatedAt: new Date('2024-01-21').toISOString(),
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
      studentId: 'student2',
      projectId: 'project2',
      report: 'I have implemented the initial optimization algorithms and tested them on sample renewable energy data. The results are promising but need further refinement.',
      submissionDate: new Date('2024-03-10').toISOString(),
      createdAt: new Date('2024-03-10').toISOString(),
      updatedAt: new Date('2024-03-10').toISOString(),
    }
  ]
};

// Database operation functions
export const getAll = (collection) => {
  return [...(dummyData[collection] || [])];
};

export const getById = (collection, id) => {
  const items = dummyData[collection] || [];
  return items.find(item => item._id === id) || null;
};

export const findOne = (collection, query) => {
  const items = dummyData[collection] || [];
  return items.find(item => {
    return Object.entries(query).every(([key, value]) => item[key] === value);
  }) || null;
};

export const find = (collection, query = {}) => {
  const items = dummyData[collection] || [];
  if (Object.keys(query).length === 0) {
    return [...items];
  }

  return items.filter(item => {
    return Object.entries(query).every(([key, value]) => item[key] === value);
  });
};

export const create = (collection, data) => {
  const newItem = {
    _id: generateId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!dummyData[collection]) {
    dummyData[collection] = [];
  }

  dummyData[collection].push(newItem);
  return newItem;
};

export const updateById = (collection, id, data) => {
  const items = dummyData[collection] || [];
  const index = items.findIndex(item => item._id === id);

  if (index === -1) {
    return null;
  }

  dummyData[collection][index] = {
    ...dummyData[collection][index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return dummyData[collection][index];
};

export const deleteById = (collection, id) => {
  const items = dummyData[collection] || [];
  const initialLength = items.length;

  dummyData[collection] = items.filter(item => item._id !== id);

  return dummyData[collection].length < initialLength;
};

// Authentication functions
export const comparePassword = async (providedPassword, storedPassword) => {
  // For demo purposes, just check if passwords match (including the hashed format)
  return storedPassword === `hashed:${providedPassword}` || providedPassword === storedPassword;
};

// Helper functions for specific data relationships
export const getProjectsBySupervisor = (supervisorId) => {
  return dummyData.projects.filter(project => project.supervisorId === supervisorId);
};

export const getAllocationsByStudent = (studentId) => {
  return dummyData.allocations.filter(allocation => allocation.studentId === studentId);
};

export const getAllocationsByProject = (projectId) => {
  return dummyData.allocations.filter(allocation => allocation.projectId === projectId);
};

export const getProgressByStudent = (studentId) => {
  return dummyData.progress.filter(progress => progress.studentId === studentId);
};

export const getProgressByProject = (projectId) => {
  return dummyData.progress.filter(progress => progress.projectId === projectId);
};

// Dashboard data functions
export const getAdminDashboardData = () => {
  return {
    totalUsers: dummyData.users.length,
    totalStudents: dummyData.students.length,
    totalSupervisors: dummyData.supervisors.length,
    totalProjects: dummyData.projects.length,
    totalAllocations: dummyData.allocations.length,
    totalProgressReports: dummyData.progress.length,
    recentActivity: [
      ...dummyData.allocations.slice(-3).map(allocation => ({
        type: 'allocation',
        message: `Student allocated to project`,
        timestamp: allocation.createdAt
      })),
      ...dummyData.progress.slice(-3).map(progress => ({
        type: 'progress',
        message: `Progress report submitted`,
        timestamp: progress.createdAt
      }))
    ]
  };
};

export const getSupervisorDashboardData = (supervisorId) => {
  const supervisorProjects = getProjectsBySupervisor(supervisorId);
  const projectIds = supervisorProjects.map(p => p._id);
  const supervisorAllocations = dummyData.allocations.filter(a => projectIds.includes(a.projectId));
  const supervisorProgress = dummyData.progress.filter(p => projectIds.includes(p.projectId));

  return {
    supervisor: dummyData.supervisors.find(s => s._id === supervisorId),
    projects: supervisorProjects,
    totalProjects: supervisorProjects.length,
    totalStudents: supervisorAllocations.length,
    totalProgressReports: supervisorProgress.length,
    recentActivity: [
      ...supervisorAllocations.slice(-3).map(allocation => ({
        type: 'allocation',
        message: `Student allocated to your project`,
        timestamp: allocation.createdAt
      })),
      ...supervisorProgress.slice(-3).map(progress => ({
        type: 'progress',
        message: `Progress report submitted for your project`,
        timestamp: progress.createdAt
      }))
    ]
  };
};

export const getStudentDashboardData = (studentId) => {
  const student = dummyData.students.find(s => s._id === studentId);
  const allocations = getAllocationsByStudent(studentId);
  const progressReports = getProgressByStudent(studentId);

  return {
    student,
    allocations,
    progressReports,
    assignedProject: allocations.length > 0 ?
      dummyData.projects.find(p => p._id === allocations[0].projectId) : null,
    totalProgressReports: progressReports.length,
    recentActivity: [
      ...allocations.map(allocation => ({
        type: 'allocation',
        message: `Allocated to project: ${dummyData.projects.find(p => p._id === allocation.projectId)?.title}`,
        timestamp: allocation.createdAt
      })),
      ...progressReports.slice(-3).map(progress => ({
        type: 'progress',
        message: `Progress report submitted`,
        timestamp: progress.createdAt
      }))
    ]
  };
};

// Export all collections for easy access
export const {
  users,
  students,
  supervisors,
  projects,
  allocations,
  progress
} = dummyData;
