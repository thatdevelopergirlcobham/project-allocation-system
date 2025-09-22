'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import type { Allocation } from '../../types';
import { GraduationCap, ArrowLeft, RefreshCw } from 'lucide-react';

export default function Allocation() {
  const { state } = useApp();
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!state.user) {
      return; // Will be handled by the conditional render below
    }

    fetchAllocations();
  }, [state.user]);

  const fetchAllocations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/allocations');
      if (response.ok) {
        const data = await response.json();
        setAllocations(data as Allocation[]);
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
  };

  const getStudentName = (studentId: Allocation['studentId']) => {
    return studentId?.name || 'Unknown Student';
  };

  const getProjectTitle = (projectId: Allocation['projectId']) => {
    return projectId?.title || 'Unknown Project';
  };

  const getSupervisorName = (supervisorId: Allocation['supervisorId']) => {
    return supervisorId?.name || 'Unknown Supervisor'; // Fixed to use actual supervisor data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-700">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Project Allocations
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <RefreshCw className="h-5 w-5 mr-1" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Allocations</h1>
            <p className="text-gray-600">View all current project allocations and assignments</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : allocations.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <p className="text-gray-600 text-lg">No allocations found</p>
              <p className="text-gray-500 mt-2">Allocations will appear here once students are assigned to projects</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {allocations.map((allocation: Allocation) => (
                  <li key={allocation._id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                              <span className="text-white font-medium">
                                {getStudentName(allocation.studentId).charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getStudentName(allocation.studentId)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {getProjectTitle(allocation.projectId)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          Supervisor: {getSupervisorName(allocation.supervisorId)}
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Assigned
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
