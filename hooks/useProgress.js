import { useState, useEffect } from 'react';
import dbConnect from '../lib/dbConnect';
import Progress from '../models/Progress';

export function useProgress() {
  const [progressReports, setProgressReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      await dbConnect();
      const progressData = await Progress.find({})
        .populate('studentId')
        .populate('projectId');
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
      await dbConnect();
      const newProgress = await Progress.create(progressData);
      setProgressReports([...progressReports, newProgress]);
      return newProgress;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProgress = async (id, progressData) => {
    try {
      await dbConnect();
      const updatedProgress = await Progress.findByIdAndUpdate(id, progressData, { new: true });
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
      await dbConnect();
      await Progress.findByIdAndDelete(id);
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
