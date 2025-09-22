'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../components/Toast';
import { UserPlus, Eye, EyeOff, Mail, User, Building2, GraduationCap } from 'lucide-react';

type UserRole = 'admin' | 'supervisor' | 'student';

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
  const { state } = useApp();
  const router = useRouter();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canAccess, setCanAccess] = useState<boolean>(true); // Always allow access

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

  useEffect(() => {
    // Always allow access to register page
    setCanAccess(true);
  }, []);

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

    setLoading(true);

    try {
      // Prepare data to send to API based on role
      const baseData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      const dataToSend = { ...baseData } as typeof baseData & {
        department?: string;
        matricNumber?: string;
        specialization?: string;
      };

      // Add role-specific fields only if required
      if (formData.role === 'supervisor') {
        dataToSend.department = formData.department;
        dataToSend.specialization = formData.specialization;
      } else if (formData.role === 'student') {
        dataToSend.department = formData.department;
        dataToSend.matricNumber = formData.matricNumber;
      }
      // Admin doesn't need additional fields

      console.log('Sending registration data:', dataToSend);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('Registration response status:', response.status);

      if (response.ok) {
        addToast({
          type: 'success',
          title: 'User created successfully',
          message: `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} account has been created`
        });
        router.push('/login');
      } else {
        const errorData = await response.json();
        console.log('Registration error data:', errorData);
        addToast({
          type: 'error',
          title: 'Registration failed',
          message: errorData.error || 'Failed to create user account'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      addToast({
        type: 'error',
        title: 'Registration error',
        message: 'An error occurred during registration'
      });
    } finally {
      setLoading(false);
    }
  };

  // Always return the registration form since access is always allowed
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-700">
                ← Back to Home
              </Link>
            </div>
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                User Registration
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {state.user ? (
                <span className="text-black">Welcome back!</span>
              ) : (
                <span className="text-black">Create Account</span>
              )}
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

          <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
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
                    <User className="h-5 w-5 text-black absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
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
                    <Mail className="h-5 w-5 text-black absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
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
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
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
                  <label htmlFor="role" className="block text-sm font-medium text-black mb-1">
                    User Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Information
                  </h3>

                  {formData.role !== 'admin' && (
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-black mb-1">
                        Department *
                      </label>
                      <div className="relative">
                        <select
                          id="department"
                          name="department"
                          required={formData.role !== 'admin'}
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                        <Building2 className="h-5 w-5 text-black absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {formData.role === 'student' && (
                    <div>
                      <label htmlFor="matricNumber" className="block text-sm font-medium text-black mb-1">
                        Matriculation Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="matricNumber"
                          name="matricNumber"
                          required={formData.role === 'student'}
                          value={formData.matricNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter matriculation number"
                        />
                        <GraduationCap className="h-5 w-5 text-black absolute right-3 top-3" />
                      </div>
                    </div>
                  )}

                  {formData.role === 'supervisor' && (
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-black mb-1">
                        Specialization *
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        required={formData.role === 'supervisor'}
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="flex items-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-60"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  {loading ? 'Creating User...' : 'Create User'}
                </button>
                <Link
                  href="/login"
                  className="flex items-center bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
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
