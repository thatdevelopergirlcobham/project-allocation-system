'use client';

import { useState, useEffect } from 'react';

export function useProgress() {
  const [progressReports, setProgressReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/progress');
      if (!response.ok) {
        throw new Error('Failed to fetch progress reports');
      }
      const progressData = await response.json();
      setProgressReports(progressData || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProgressReports([]);
    } finally {
      setLoading(false);
    }
  };

  const createProgress = async (progressData) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create progress report');
      }
      
      const newProgress = await response.json();
      setProgressReports([...progressReports, newProgress]);
      return newProgress;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProgress = async (id, progressData) => {
    try {
      const response = await fetch(`/api/progress/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update progress report');
      }
      
      const updatedProgress = await response.json();
      setProgressReports(progressReports.map(progress =>
        progress._id === id ? updatedProgress : progress
      ));
      return updatedProgress;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProgress = async (id) => {
    try {
      const response = await fetch(`/api/progress/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete progress report');
      }
      
      setProgressReports(progressReports.filter(progress => progress._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return {
    progressReports,
    loading,
    error,
    createProgress,
    updateProgress,
    deleteProgress,
    refetch: fetchProgress,
  };
}
