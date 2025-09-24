'use client';

import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { Users, BookOpen, TrendingUp, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

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

  // Dashboard summary cards
  const summaryCards = [
    {
      title: 'Active Projects',
      value: '12',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Students',
      value: '48',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Upcoming Deadlines',
      value: '3',
      icon: Calendar,
      color: 'bg-yellow-500'
    },
    {
      title: 'Completion Rate',
      value: '78%',
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
  ];

  return (
    <>
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 border-indigo-500">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Here's an overview of your project allocation system.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`rounded-full p-3 ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-700">{card.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {getDashboardContent()}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Project allocation completed</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">New student registered</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-100 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Deadline approaching for progress report</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
