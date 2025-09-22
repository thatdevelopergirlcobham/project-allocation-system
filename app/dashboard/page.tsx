'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Users, BookOpen, TrendingUp, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!state.user) {
      router.push('/login');
    }
  }, [state.user, router]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getDashboardContent = () => {
    switch (state.user?.role) {
      case 'student':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Student Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/allocation" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Project</h3>
                <p className="text-gray-600">Check your assigned project</p>
              </Link>
              <Link href="/progress" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <TrendingUp className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Progress</h3>
                <p className="text-gray-600">Update your project progress</p>
              </Link>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="h-8 w-8 text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Supervisor</h3>
                <p className="text-gray-600">Contact information</p>
              </div>
            </div>
          </div>
        );
      case 'supervisor':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Supervisor Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Project Allocation System
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-black">Welcome, {state.user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {getDashboardContent()}
        </div>
      </div>
    </div>
  );
}
