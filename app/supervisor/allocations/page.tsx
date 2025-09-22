import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { GraduationCap, ArrowLeft, Users } from 'lucide-react';

export default function SupervisorAllocations() {
  const { state } = useApp();
  const router = useRouter();
  const [allocations, setAllocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.user || state.user.role !== 'supervisor') {
      router.push('/login');
      return;
    }

    fetchAllocations();
  }, [state.user, router]);

  const fetchAllocations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/allocations');
      if (response.ok) {
        const data = await response.json();
        // Filter to show only this supervisor's allocations
        const supervisorAllocations = data.filter((allocation: any) =>
          allocation.supervisorId?._id === state.user?._id
        );
        setAllocations(supervisorAllocations);
      } else {
        console.error('Failed to fetch allocations');
        setAllocations([]);
      }
    } catch (error) {
      console.error('Error fetching allocations:', error);
      setAllocations([]);
    } finally {
      setLoading(false);
    }
  }, [state.user?._id]);

  useEffect(() => {
    if (!state.user || state.user.role !== 'supervisor') {
      router.push('/login');
      return;
    }

    fetchAllocations();
  }, [state.user, router, fetchAllocations]);

  if (!state.user || state.user.role !== 'supervisor') {
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
                My Allocations
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Supervisor: {state.user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Allocations</h1>
            <p className="text-gray-600">View students allocated to your projects</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : allocations.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No allocations found</p>
              <p className="text-gray-500 mt-2">Allocations will appear here once students are assigned to your projects</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {allocations.map((allocation: any) => (
                  <li key={allocation._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                              <span className="text-white font-medium">
                                {allocation.studentId?.name?.charAt(0) || 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {allocation.studentId?.name || 'Unknown Student'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {allocation.studentId?.email || 'Unknown Email'}
                            </div>
                            <div className="text-sm text-gray-500">
                              Project: {allocation.projectId?.title || 'Unknown Project'}
                            </div>
                            <div className="text-sm text-gray-500">
                              Matric: {allocation.studentId?.matricNumber || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          Allocated: {new Date(allocation.createdAt).toLocaleDateString()}
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Active
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
