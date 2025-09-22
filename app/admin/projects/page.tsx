import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { useToast } from '../../../components/Toast';
import type { Project } from '../../../types';
import { GraduationCap, ArrowLeft, BookOpen, Plus, UserPlus } from 'lucide-react';

export default function AdminProjects() {
  const { state } = useApp();
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.user || state.user.role !== 'admin') {
      return; // Will be handled by conditional render
    }

    fetchProjects();
  }, [state.user, fetchProjects]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        addToast({
          type: 'error',
          title: 'Failed to fetch projects',
          message: 'Unable to load projects'
        });
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      addToast({
        type: 'error',
        title: 'Error loading projects',
        message: 'Failed to load project data'
      });
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!state.user || state.user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Please log in as admin to access this page</p>
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
                All Projects
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/register" className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                <UserPlus className="h-5 w-5 mr-1" />
                Register User
              </Link>
              <Link href="/admin/projects/new" className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                <Plus className="h-5 w-5 mr-1" />
                Add Project
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Projects</h1>
            <p className="text-gray-600">View and manage all projects in the system</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No projects found</p>
              <p className="text-gray-500 mt-2">Add your first project to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project: Project) => (
                <div key={project._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Supervisor: {project.supervisorId?.name || 'Unknown'}</span>
                        <span>Department: {project.department}</span>
                        <span>Students: {project.currentStudents}/{project.maxStudents}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/projects/${project._id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/projects/${project._id}/students`}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        View Students
                      </Link>
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
