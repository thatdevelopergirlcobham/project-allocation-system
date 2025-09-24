'use client';

import { useState, useEffect } from 'react';

export function useAllocations() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/allocations');
      if (!response.ok) {
        throw new Error('Failed to fetch allocations');
      }
      const allocationsData = await response.json();
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
      const response = await fetch('/api/allocations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allocationData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create allocation');
      }
      
      const newAllocation = await response.json();
      setAllocations([...allocations, newAllocation]);
      return newAllocation;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateAllocation = async (id, allocationData) => {
    try {
      const response = await fetch(`/api/allocations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allocationData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update allocation');
      }
      
      const updatedAllocation = await response.json();
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
      const response = await fetch(`/api/allocations/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete allocation');
      }
      
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
