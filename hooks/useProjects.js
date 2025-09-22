import { useState, useEffect } from 'react';
import dbConnect from '../lib/dbConnect';
import Project from '../models/Project';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      await dbConnect();
      const projectsData = await Project.find({}).populate('supervisorId');
      setProjects(projectsData || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      await dbConnect();
      const newProject = await Project.create(projectData);
      setProjects([...projects, newProject]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      await dbConnect();
      const updatedProject = await Project.findByIdAndUpdate(id, projectData, { new: true });
      setProjects(projects.map(project =>
        project._id === id ? updatedProject : project
      ));
      return updatedProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      await dbConnect();
      await Project.findByIdAndDelete(id);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
}
