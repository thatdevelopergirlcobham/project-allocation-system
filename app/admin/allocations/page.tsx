"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { Allocation } from '../../../types';
import { GraduationCap, ArrowLeft, TrendingUp } from 'lucide-react';

export default function AdminAllocations() {
  const { state } = useApp();
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.user || state.user.role !== 'admin') {
      return; // Will be handled by conditional render
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'allocated': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
                Allocation Status
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchAllocations}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Allocations</h1>
            <p className="text-gray-600">Monitor and manage project-student allocations</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : allocations.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
                                {typeof allocation.studentId === 'object' && allocation.studentId?.name ? allocation.studentId.name.charAt(0) : 'U'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {typeof allocation.studentId === 'object' && allocation.studentId?.name ? allocation.studentId.name : 'Unknown Student'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {typeof allocation.studentId === 'object' && allocation.studentId?.email ? allocation.studentId.email : 'Unknown Email'}
                            </div>
                            <div className="text-sm text-gray-500">
                              Project: {typeof allocation.projectId === 'object' && allocation.projectId?.title ? allocation.projectId.title : 'Unknown Project'}
                            </div>
                            <div className="text-sm text-gray-500">
                              Supervisor: {typeof allocation.supervisorId === 'object' && allocation.supervisorId?.name ? allocation.supervisorId.name : 'Unknown Supervisor'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          Allocated: {allocation.createdAt ? new Date(allocation.createdAt).toLocaleDateString() : 'Unknown date'}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor('allocated')}`}>
                          Allocated
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
