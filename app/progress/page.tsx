'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ArrowLeft, Plus, MessageSquare } from 'lucide-react';

export default function Progress() {
  const { state } = useApp();
  const router = useRouter();
  const [progressReports, setProgressReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReport, setNewReport] = useState({
    report: '',
    projectId: ''
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!state.user) {
      router.push('/login');
      return;
    }

    // Fetch progress reports
    fetchProgressReports();
  }, [state.user, router]);

  const fetchProgressReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/progress');
      if (response.ok) {
        const data = await response.json();
        setProgressReports(data);
      } else {
        console.error('Failed to fetch progress reports');
        setProgressReports([]);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
      setProgressReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - replace with actual API call
    console.log('Submitting progress report:', newReport);
    setNewReport({ report: '', projectId: '' });
    setShowForm(false);
    fetchProgressReports(); // Refresh the list
  };

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
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
                Progress Reports
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {state.user?.role === 'student' && (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="h-5 w-5 mr-1" />
                  New Report
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Reports</h1>
            <p className="text-gray-600">Track and manage project progress</p>
          </div>

          {/* New Report Form */}
          {showForm && state.user?.role === 'student' && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit New Progress Report</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                    Project
                  </label>
                  <select
                    id="projectId"
                    value={newReport.projectId}
                    onChange={(e) => setNewReport({...newReport, projectId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select a project</option>
                    <option value="project1">Sample Project 1</option>
                    <option value="project2">Sample Project 2</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="report" className="block text-sm font-medium text-gray-700 mb-1">
                    Progress Report
                  </label>
                  <textarea
                    id="report"
                    value={newReport.report}
                    onChange={(e) => setNewReport({...newReport, report: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="Describe your progress..."
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Submit Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : progressReports.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No progress reports found</p>
              <p className="text-gray-500 mt-2">
                {state.user?.role === 'student'
                  ? 'Submit your first progress report to get started'
                  : 'Progress reports will appear here once students submit them'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {progressReports.map((report) => (
                <div key={report._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Student: {report.studentId.name || 'Unknown Student'}
                      </h3>
                      <p className="text-gray-600">
                        Project: {report.projectId.title || 'Unknown Project'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(report.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    {report.feedback && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 max-w-md">
                        <h4 className="text-sm font-medium text-green-800 mb-1">Supervisor Feedback:</h4>
                        <p className="text-sm text-green-700">{report.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Report:</h4>
                    <p className="text-gray-700">{report.report}</p>
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
