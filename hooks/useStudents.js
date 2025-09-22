import { useState, useEffect } from 'react';
import dbConnect from '../lib/dbConnect';
import Student from '../models/Student';

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      await dbConnect();
      const studentsData = await Student.find({}).populate('assignedProject');
      setStudents(studentsData || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (studentData) => {
    try {
      await dbConnect();
      const newStudent = await Student.create(studentData);
      setStudents([...students, newStudent]);
      return newStudent;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      await dbConnect();
      const updatedStudent = await Student.findByIdAndUpdate(id, studentData, { new: true });
      setStudents(students.map(student =>
        student._id === id ? updatedStudent : student
      ));
      return updatedStudent;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await dbConnect();
      await Student.findByIdAndDelete(id);
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents,
  };
}
