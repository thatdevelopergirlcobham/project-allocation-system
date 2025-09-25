'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/Toast';
import { UserPlus, Eye, EyeOff, Mail, User, Building2, GraduationCap, ArrowLeft } from 'lucide-react';
import { UserRole } from '../../types';

// Using UserRole from types.ts

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  department?: string;
  matricNumber?: string;
  specialization?: string;
}

export default function Register() {
  const router = useRouter();
  const { addToast } = useToast();
  const { signup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: '',
    matricNumber: '',
    specialization: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      addToast({
        type: 'error',
        title: 'Password mismatch',
        message: 'Passwords do not match'
      });
      return;
    }

    if (formData.password.length < 6) {
      addToast({
        type: 'error',
        title: 'Password too short',
        message: 'Password must be at least 6 characters long'
      });
      return;
    }

    // Prepare data to send to API based on role
    const registerData: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
      department?: string;
      matricNumber?: string;
      specialization?: string;
    } = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    // Add role-specific fields only when needed
    if (formData.role === 'supervisor') {
      registerData.department = formData.department;
      registerData.specialization = formData.specialization;
      // Don't include matricNumber for supervisors
    } else if (formData.role === 'student') {
      registerData.department = formData.department;
      registerData.matricNumber = formData.matricNumber;
      // specialization is optional for students
      if (formData.specialization) {
        registerData.specialization = formData.specialization;
      }
    } else if (formData.role === 'admin') {
      // Admins don't need additional fields, but include them if provided
      // if (formData.department) registerData.department = formData.department;
      // if (formData.specialization) registerData.specialization = formData.specialization;
      // if (formData.matricNumber) registerData.matricNumber = formData.matricNumber;
    }

    const result = await signup(registerData);

    if (result.success) {
      addToast({
        type: 'success',
        title: 'Registration successful',
        message: `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} account has been created`
      });
      router.push('/login');
    } else {
      addToast({
        type: 'error',
        title: 'Registration failed',
        message: result.message
      });
    }
  };

  // Return the registration form
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                User Registration
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create User Account</h1>
            <p className="text-gray-600">Register a new account for the Project Allocation System</p>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-indigo-900 border-b border-indigo-100 pb-2">Basic Information</h3>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter full name"
                    />
                    <User className="h-5 w-5 text-indigo-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="user@university.edu"
                    />
                    <Mail className="h-5 w-5 text-indigo-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-black hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-black hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    User Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Administrator</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>

              {/* Role-specific Information */}
              {formData.role && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-indigo-900 border-b border-indigo-100 pb-2">
                    {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Information
                  </h3>

                  {formData.role !== 'admin' as UserRole && (
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department *
                      </label>
                      <div className="relative">
                        <select
                          id="department"
                          name="department"
                          required={formData.role !== 'admin' as UserRole}
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">Select Department</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Software Engineering">Software Engineering</option>
                          <option value="Information Technology">Information Technology</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Biology">Biology</option>
                        </select>
                        <Building2 className="h-5 w-5 text-indigo-500 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {formData.role === 'student' && (
                    <div>
                      <label htmlFor="matricNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Matriculation Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="matricNumber"
                          name="matricNumber"
                          required={formData.role === 'student' as UserRole}
                          value={formData.matricNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter matriculation number"
                        />
                        <GraduationCap className="h-5 w-5 text-indigo-500 absolute right-3 top-3" />
                      </div>
                    </div>
                  )}

                  {formData.role === 'supervisor' && (
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization *
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        required={formData.role === 'supervisor' as UserRole}
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter specialization area"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60 shadow-md font-medium"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  {loading ? 'Creating User...' : 'Create User'}
                </button>
                <Link
                  href="/login"
                  className="flex items-center bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
