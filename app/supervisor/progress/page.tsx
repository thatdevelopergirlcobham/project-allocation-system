'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { GraduationCap, ArrowLeft, MessageSquare, CheckCircle } from 'lucide-react';
import { ProgressReport, Project } from '../../../types';

export default function SupervisorProgress() {
  const { state } = useApp();
  const router = useRouter();
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSupervisorData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch supervisor's projects
      const projectsResponse = await fetch(`/api/projects?supervisorId=${state.user?._id}`);
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        
        // Get project IDs for filtering progress reports
        const projectIds = projectsData.map((project: Project) => project._id);
        
        // Fetch progress reports for supervisor's projects
        const progressResponse = await fetch('/api/progress');
        if (progressResponse.ok) {
          const allReports = await progressResponse.json();
          // Filter reports to only include those for the supervisor's projects
          const filteredReports = allReports.filter((report: ProgressReport) => {
            if (typeof report.projectId === 'object' && report.projectId?._id) {
              return projectIds.includes(report.projectId._id);
            }
            return projectIds.includes(report.projectId as string);
          });
          setProgressReports(filteredReports);
        } else {
          console.error('Failed to fetch progress reports');
          setProgressReports([]);
        }
      } else {
        console.error('Failed to fetch supervisor projects');
        setProgressReports([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setProgressReports([]);
    } finally {
      setLoading(false);
    }
  }, [state.user?._id]);

  useEffect(() => {
    if (!state.user || state.user.role !== 'supervisor') {
      router.push('/login');
      return;
    }

    fetchSupervisorData();
  }, [state.user, router, fetchSupervisorData]);


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
                Review Progress
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Student Progress</h1>
            <p className="text-gray-600">Review and provide feedback on student progress reports</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : progressReports.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No progress reports to review</p>
              <p className="text-gray-500 mt-2">Progress reports will appear here once students submit them</p>
            </div>
          ) : (
            <div className="space-y-4">
              {progressReports.map((report: ProgressReport) => (
                <div key={report._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Student: {typeof report.studentId === 'object' && report.studentId?.name ? report.studentId.name : 'Unknown Student'}
                      </h3>
                      <p className="text-gray-600">
                        Project: {typeof report.projectId === 'object' && report.projectId?.title ? report.projectId.title : 'Unknown Project'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(report.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    {report.feedback && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 max-w-md">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="text-sm font-medium text-green-800">Feedback Provided</h4>
                        </div>
                        <p className="text-sm text-green-700 mt-1">{report.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Progress Report:</h4>
                    <p className="text-gray-700">{report.report}</p>
                  </div>
                  {!report.feedback && (
                    <div className="mt-4">
                      <FeedbackForm reportId={report._id} onFeedbackAdded={fetchSupervisorData} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedbackForm({ reportId, onFeedbackAdded }: { reportId: string; onFeedbackAdded: () => void }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      const response = await fetch(`/api/progress/${reportId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        setFeedback('');
        onFeedbackAdded();
      }
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-200 rounded-md p-4">
      <h4 className="text-sm font-medium text-blue-800 mb-2">Add Feedback:</h4>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        rows={3}
        placeholder="Provide constructive feedback..."
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
      >
        Submit Feedback
      </button>
    </form>
  );
}
