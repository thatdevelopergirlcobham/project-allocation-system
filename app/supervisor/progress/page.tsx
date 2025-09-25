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
      // Using dummy data directly instead of fetching from API
      // This simulates the API response with our dummy data
      if (state.user?._id) {
        // Mock progress reports for the current supervisor
        const mockProgressReports = [
          {
            _id: 'progress1',
            studentId: {
              _id: 'student1',
              name: 'John Doe',
              email: 'john.doe@example.com',
              matricNumber: 'CS2024001',
              department: 'Computer Science'
            },
            projectId: {
              _id: 'project1',
              title: 'AI-Powered Healthcare System',
              description: 'Develop an AI system for medical diagnosis assistance.',
              supervisorId: state.user._id,
              status: 'assigned',
              department: 'Computer Science',
              currentStudents: 1,
              maxStudents: 3,
              duration: '6 months',
              requirements: 'Python, Machine Learning, Healthcare domain knowledge',
              createdAt: new Date('2024-01-15').toISOString(),
              updatedAt: new Date('2024-01-15').toISOString()
            } as Project,
            report: 'I have completed the initial research phase and started implementing the machine learning model. Currently working on data preprocessing and feature selection.',
            submissionDate: new Date('2024-03-01').toISOString(),
            feedback: 'Good progress. Consider exploring more recent research papers on feature selection techniques for healthcare data.',
            createdAt: new Date('2024-03-01').toISOString(),
            updatedAt: new Date('2024-03-02').toISOString(),
          },
          {
            _id: 'progress3',
            studentId: {
              _id: 'student4',
              name: 'Emma Davis',
              email: 'emma.davis@example.com',
              matricNumber: 'CS2024003',
              department: 'Computer Science'
            },
            projectId: {
              _id: 'project2',
              title: 'Natural Language Processing for Education',
              description: 'Create an NLP system to assist in educational content creation.',
              supervisorId: state.user._id,
              status: 'available',
              department: 'Computer Science',
              currentStudents: 0,
              maxStudents: 2,
              duration: '4 months',
              requirements: 'NLP, Python, Education background preferred',
              createdAt: new Date('2024-01-16').toISOString(),
              updatedAt: new Date('2024-01-16').toISOString()
            } as Project,
            report: 'I have implemented the initial text processing pipeline and tested it on sample educational content. The results are promising but need further refinement.',
            submissionDate: new Date('2024-03-10').toISOString(),
            createdAt: new Date('2024-03-10').toISOString(),
            updatedAt: new Date('2024-03-10').toISOString(),
          }
        ];
        
        setProgressReports(mockProgressReports);
      } else {
        setProgressReports([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setProgressReports([]);
    } finally {
      setLoading(false);
    }
  }, [state.user]);

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
          <div className="flex flex-col md:flex-row justify-between py-4 md:h-16 md:py-0">
            <div className="flex items-center justify-center md:justify-start py-2 md:py-0">
              <Link href="/dashboard" className="flex items-center text-indigo-600 hover:text-indigo-700">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center justify-center py-2 md:py-0">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Review Progress
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-end py-2 md:py-0">
              <span className="text-gray-700 text-sm md:text-base">Supervisor: {state.user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="px-2 py-4 sm:px-0 sm:py-6">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Review Student Progress</h1>
            <p className="text-sm sm:text-base text-gray-600">Review and provide feedback on student progress reports</p>
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
                <div key={report._id} className="bg-white shadow rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 space-y-3 md:space-y-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Student: {typeof report.studentId === 'object' && report.studentId?.name ? report.studentId.name : 'Unknown Student'}
                      </h3>
                      <p className="text-gray-600">
                        Project: {typeof report.projectId === 'object' && report.projectId?.title ? report.projectId.title : 'Unknown Project'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Submitted: {new Date(report.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    {report.feedback && (
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 w-full md:max-w-md">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 mr-2" />
                          <h4 className="text-xs sm:text-sm font-medium text-green-800">Feedback Provided</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-green-700 mt-1">{report.feedback}</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-md p-3 sm:p-4">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2">Progress Report:</h4>
                    <p className="text-xs sm:text-sm text-gray-700">{report.report}</p>
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

function FeedbackForm({ reportId: _reportId, onFeedbackAdded }: { reportId: string; onFeedbackAdded: () => void }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      // Simulate API call with dummy data
      // In a real app, this would be an API call
      setTimeout(() => {
        setFeedback('');
        onFeedbackAdded();
      }, 500);
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50 border text-black border-blue-200 rounded-md p-3 sm:p-4">
      <h4 className="text-xs sm:text-sm font-medium text-blue-800 mb-2">Add Feedback:</h4>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full px-2 sm:px-3 py-1 sm:py-2 text-sm border border-blue-300 rounded-md focus:outline-none text-black focus:ring-blue-500 focus:border-blue-500"
        rows={3}
        placeholder="Provide constructive feedback..."
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm"
      >
        Submit Feedback
      </button>
    </form>
  );
}
