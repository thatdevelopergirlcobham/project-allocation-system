'use client';

import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { Users, BookOpen, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'student':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Student Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/allocation" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Project</h3>
                <p className="text-gray-600">Check your assigned project</p>
              </Link>
              <Link href="/student/progress" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <TrendingUp className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Progress</h3>
                <p className="text-gray-600">Update your project progress</p>
              </Link>
              <Link href="/student/supervisor" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Supervisor</h3>
                <p className="text-gray-600">Contact information</p>
              </Link>
            </div>
          </div>
        );
      case 'supervisor':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Supervisor Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/supervisor/projects" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Projects</h3>
                <p className="text-gray-600">Create and manage projects</p>
              </Link>
              <Link href="/supervisor/students" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Students</h3>
                <p className="text-gray-600">View assigned students</p>
              </Link>
              <Link href="/supervisor/progress" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <TrendingUp className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Progress</h3>
                <p className="text-gray-600">Review student submissions</p>
              </Link>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Link href="/admin/students" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Students</h3>
                <p className="text-gray-600">Add, edit, delete students</p>
              </Link>
              <Link href="/admin/supervisors" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Supervisors</h3>
                <p className="text-gray-600">Manage supervisor accounts</p>
              </Link>
              <Link href="/admin/projects" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">All Projects</h3>
                <p className="text-gray-600">View all projects</p>
              </Link>
              <Link href="/admin/assign" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <TrendingUp className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Assign Students</h3>
                <p className="text-gray-600">Assign students to projects</p>
              </Link>
              <Link href="/admin/allocations" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <TrendingUp className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Allocation Status</h3>
                <p className="text-gray-600">Monitor allocations</p>
              </Link>
            </div>
          </div>
        );
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">
                Project Allocation System
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Main Dashboard Content */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {getDashboardContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
