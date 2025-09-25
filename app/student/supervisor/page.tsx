'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { GraduationCap, ArrowLeft, Mail, User } from 'lucide-react';

export default function StudentSupervisor() {
  const { state } = useApp();
  const router = useRouter();
  const [supervisor, setSupervisor] = useState<{
    _id: string;
    name: string;
    email: string;
    department: string;
    specialization?: string;
    projectsCount?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.user || state.user.role !== 'student') {
      router.push('/login');
      return;
    }

    fetchSupervisor();
  }, [state.user, router, fetchSupervisor]);

  const fetchSupervisor = async () => {
    setLoading(true);
    try {
      // First get the student's allocation to find their supervisor
      const allocResponse = await fetch(`/api/allocations?studentId=${state.user?._id}`);
      if (allocResponse.ok) {
        const allocations = await allocResponse.json();
        if (allocations && allocations.length > 0) {
          const allocation = allocations[0];
          const supervisorId = allocation.supervisorId;

          // Fetch supervisor details
          const supervisorResponse = await fetch(`/api/supervisors/${supervisorId}`);
          if (supervisorResponse.ok) {
            const supervisorData = await supervisorResponse.json();
            setSupervisor(supervisorData);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching supervisor:', error);
    } finally {
      setLoading(false);
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
                My Supervisor
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Supervisor</h1>
            <p className="text-gray-600">Contact information for your project supervisor</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : !supervisor ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No supervisor assigned yet</p>
              <p className="text-gray-500 mt-2">You will be assigned a supervisor once you are allocated to a project.</p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-16 w-16">
                  <div className="h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-white font-medium text-xl">
                      {supervisor.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-900">{supervisor.name}</h2>
                  <p className="text-gray-600">Project Supervisor</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{supervisor.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Department</p>
                      <p className="text-gray-900">{supervisor.department}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {supervisor.specialization && (
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Specialization</p>
                        <p className="text-gray-900">{supervisor.specialization}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Projects Supervised</p>
                      <p className="text-gray-900">{supervisor.projectsCount || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Contact your supervisor directly using the email address above for any questions about your project.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
