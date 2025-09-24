'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { Project, Supervisor } from '../../../types';
import { GraduationCap, ArrowLeft, BookOpen, User, Calendar } from 'lucide-react';

export default function StudentProjects() {
  const { state } = useApp();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.user || state.user.role !== 'student') {
      router.push('/login');
      return;
    }

    fetchProjects();
  }, [state.user, router]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const mockProjects: Project[] = [
        {
          _id: '1',
          title: 'AI-Powered Healthcare System',
          description: 'Develop an AI system for medical diagnosis assistance using machine learning algorithms.',
          supervisorId: { 
            name: 'Dr. Jane Smith', 
            _id: 's1', 
            email: 'jane.smith@example.com', 
            department: 'Computer Science', 
            projectsCount: 5,
            specialization: 'AI and Machine Learning'
          } as Supervisor,
          department: 'Computer Science',
          duration: '6 months',
          requirements: 'Python, Machine Learning, Healthcare domain knowledge',
          status: 'available',
          maxStudents: 3,
          currentStudents: 2,
          createdAt: new Date('2024-01-15').toISOString()
        },
        {
          _id: '2',
          title: 'Sustainable Energy Optimization',
          description: 'Research and develop algorithms for optimizing renewable energy distribution in smart grids.',
          supervisorId: { 
            name: 'Prof. Michael Johnson', 
            _id: 's2', 
            email: 'michael.johnson@example.com', 
            department: 'Engineering', 
            projectsCount: 3,
            specialization: 'Energy Systems'
          } as Supervisor,
          department: 'Engineering',
          duration: '8 months',
          requirements: 'Mathematics, Programming, Energy systems knowledge',
          status: 'available',
          maxStudents: 4,
          currentStudents: 4,
          createdAt: new Date('2024-01-10').toISOString()
        },
        {
          _id: '3',
          title: 'Blockchain Security Analysis',
          description: 'Analyze security vulnerabilities in blockchain networks and develop mitigation strategies.',
          supervisorId: { 
            name: 'Dr. Sarah Wilson', 
            _id: 's3', 
            email: 'sarah.wilson@example.com', 
            department: 'Cybersecurity', 
            projectsCount: 2,
            specialization: 'Blockchain Security'
          } as Supervisor,
          department: 'Cybersecurity',
          duration: '5 months',
          requirements: 'Cryptography, Network Security, Programming',
          status: 'available',
          maxStudents: 2,
          currentStudents: 1,
          createdAt: new Date('2024-01-20').toISOString()
        }
      ];
      setProjects(mockProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'full': return 'Full';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  if (!state.user || state.user.role !== 'student') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center text-indigo-600 hover:text-indigo-700">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Available Projects
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Student: {state.user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Projects</h1>
            <p className="text-gray-600">Browse and learn about available research projects</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No projects available</p>
              <p className="text-gray-500 mt-2">Check back later for new project opportunities</p>
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project: Project) => (
                <div key={project._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{project.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Supervisor
                          </h4>
                          <p className="text-sm text-gray-600">{typeof project.supervisorId === 'object' ? project.supervisorId.name : 'Unknown'}</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Project Details
                          </h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Duration: {project.duration}</p>
                            <p>Students: {project.currentStudents}/{project.maxStudents}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {project.requirements}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Department: {project.department}
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          href={`/student/projects/${project._id}/apply`}
                          className={`px-4 py-2 rounded-md transition-colors text-sm ${
                            project.status === 'full'
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                          onClick={(e) => {
                            if (project.status === 'full') {
                              e.preventDefault();
                            }
                          }}
                        >
                          {project.status === 'full' ? 'Project Full' : 'Apply for Project'}
                        </Link>
                        <Link
                          href={`/student/projects/${project._id}`}
                          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
