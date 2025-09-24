'use client';

import { useState, useEffect } from 'react';

export function useSupervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSupervisors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/supervisors');
      if (!response.ok) {
        throw new Error('Failed to fetch supervisors');
      }
      const supervisorsData = await response.json();
      setSupervisors(supervisorsData || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSupervisors([]);
    } finally {
      setLoading(false);
    }
  };

  const createSupervisor = async (supervisorData) => {
    try {
      const response = await fetch('/api/supervisors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supervisorData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create supervisor');
      }
      
      const newSupervisor = await response.json();
      setSupervisors([...supervisors, newSupervisor]);
      return newSupervisor;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSupervisor = async (id, supervisorData) => {
    try {
      const response = await fetch(`/api/supervisors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supervisorData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update supervisor');
      }
      
      const updatedSupervisor = await response.json();
      setSupervisors(supervisors.map(supervisor =>
        supervisor._id === id ? updatedSupervisor : supervisor
      ));
      return updatedSupervisor;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteSupervisor = async (id) => {
    try {
      const response = await fetch(`/api/supervisors/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete supervisor');
      }
      
      setSupervisors(supervisors.filter(supervisor => supervisor._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, []);

  return {
    supervisors,
    loading,
    error,
    createSupervisor,
    updateSupervisor,
    deleteSupervisor,
    refetch: fetchSupervisors,
  };
}
