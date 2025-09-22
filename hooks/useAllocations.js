import { useState, useEffect } from 'react';
import dbConnect from '../lib/dbConnect';
import Allocation from '../models/Allocation';

export function useAllocations() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      await dbConnect();
      const allocationsData = await Allocation.find({})
        .populate('studentId')
        .populate('projectId')
        .populate('supervisorId');
      setAllocations(allocationsData || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setAllocations([]);
    } finally {
      setLoading(false);
    }
  };

  const createAllocation = async (allocationData) => {
    try {
      await dbConnect();
      const newAllocation = await Allocation.create(allocationData);
      setAllocations([...allocations, newAllocation]);
      return newAllocation;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateAllocation = async (id, allocationData) => {
    try {
      await dbConnect();
      const updatedAllocation = await Allocation.findByIdAndUpdate(id, allocationData, { new: true });
      setAllocations(allocations.map(allocation =>
        allocation._id === id ? updatedAllocation : allocation
      ));
      return updatedAllocation;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteAllocation = async (id) => {
    try {
      await dbConnect();
      await Allocation.findByIdAndDelete(id);
      setAllocations(allocations.filter(allocation => allocation._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  return {
    allocations,
    loading,
    error,
    createAllocation,
    updateAllocation,
    deleteAllocation,
    refetch: fetchAllocations,
  };
}
