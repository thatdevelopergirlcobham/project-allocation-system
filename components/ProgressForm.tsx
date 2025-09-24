'use client';

import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { ProgressReport } from '../types';

interface ProgressFormProps {
  studentId: string;
  projectId: string;
  onSubmit?: (data: ProgressReport) => void;
  onCancel?: () => void;
}

export default function ProgressForm({ studentId, projectId, onSubmit, onCancel }: ProgressFormProps) {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const { createProgress } = useProgress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProgress = await createProgress({
        studentId,
        projectId,
        report
      });

      if (onSubmit) {
        onSubmit(newProgress);
      }
      setReport('');
    } catch (error) {
      console.error('Error submitting progress:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit Progress Report</h2>

      <div className="mb-4">
        <label htmlFor="report" className="block text-sm font-medium text-gray-700 mb-1">
          Progress Report
        </label>
        <textarea
          id="report"
          value={report}
          onChange={(e) => setReport(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          placeholder="Describe your progress, challenges, and next steps..."
          required
        />
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
