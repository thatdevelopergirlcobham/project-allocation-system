'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../../context/AppContext';
import { GraduationCap, ArrowLeft, Plus, MessageSquare } from 'lucide-react';
import ProgressForm from '../../../components/ProgressForm';
import { ProgressReport, Project } from '../../../types';

export default function StudentProgress() {
  const { state } = useApp();
  const router = useRouter();
  // We're using direct API calls instead of the hook for better control over the UI state
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [studentProject, setStudentProject] = useState<Project | null>(null);

  const fetchStudentData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch the student's assigned project
      const allocResponse = await fetch(`/api/allocations?studentId=${state.user?._id}`);
      if (allocResponse.ok) {
        const allocations = await allocResponse.json();
        if (allocations && allocations.length > 0) {
          setStudentProject(allocations[0].projectId as Project);
        }
      }

      // Fetch progress reports
      const progressResponse = await fetch('/api/progress');
      if (progressResponse.ok) {
        const data = await progressResponse.json();
        // Filter to show only this student's reports
        const studentReports = data.filter((report: ProgressReport) => {
          if (typeof report.studentId === 'object' && report.studentId?._id) {
            return report.studentId._id === state.user?._id;
          }
          return report.studentId === state.user?._id;
        });
        setProgressReports(studentReports);
      } else {
        console.error('Failed to fetch progress reports');
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
    if (!state.user || state.user.role !== 'student') {
      router.push('/login');
      return;
    }

    fetchStudentData();
  }, [state.user, fetchStudentData, router]);

  const handleProgressSubmit = (newProgress: ProgressReport) => {
    setProgressReports([newProgress, ...progressReports]);
    setShowForm(false);
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
                My Progress Reports
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-1" />
                New Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Progress Reports</h1>
            <p className="text-gray-600">Track and manage your project progress</p>
          </div>

          {/* New Report Form */}
          {showForm && studentProject && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit New Progress Report</h2>
              <ProgressForm 
                studentId={state.user?._id || ''} 
                projectId={studentProject._id} 
                onSubmit={handleProgressSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}
          
          {showForm && !studentProject && (
            <div className="bg-white shadow rounded-lg p-6 mb-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">No Project Assigned</h2>
              <p className="text-gray-600 mb-4">You need to be assigned to a project before you can submit progress reports.</p>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
            </div>
          ) : progressReports.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No progress reports submitted yet</p>
              <p className="text-gray-500 mt-2">
                Submit your first progress report to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {progressReports.map((report: ProgressReport) => (
                <div key={report._id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Project: {typeof report.projectId === 'object' && report.projectId?.title ? report.projectId.title : 'Unknown Project'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(report.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    {report.feedback ? (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 max-w-md">
                        <h4 className="text-sm font-medium text-green-800 mb-1">Supervisor Feedback:</h4>
                        <p className="text-sm text-green-700">{report.feedback}</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 max-w-md">
                        <h4 className="text-sm font-medium text-yellow-800 mb-1">Awaiting Feedback</h4>
                        <p className="text-sm text-yellow-700">Your supervisor will review this report soon.</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Your Report:</h4>
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
