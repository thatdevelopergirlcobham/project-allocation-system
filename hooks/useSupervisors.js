import { useState, useEffect } from 'react';
import dbConnect from '../lib/dbConnect';
import Supervisor from '../models/Supervisor';

export function useSupervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSupervisors = async () => {
    try {
      setLoading(true);
      await dbConnect();
      const supervisorsData = await Supervisor.find({});
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
      await dbConnect();
      const newSupervisor = await Supervisor.create(supervisorData);
      setSupervisors([...supervisors, newSupervisor]);
      return newSupervisor;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSupervisor = async (id, supervisorData) => {
    try {
      await dbConnect();
      const updatedSupervisor = await Supervisor.findByIdAndUpdate(id, supervisorData, { new: true });
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
      await dbConnect();
      await Supervisor.findByIdAndDelete(id);
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
