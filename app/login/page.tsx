'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Mail, Lock, User, ChevronDown } from 'lucide-react';

type UserRole = 'student' | 'supervisor' | 'admin';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as UserRole
  });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_USER', payload: data.user });
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value as UserRole
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mx-auto w-fit bg-white p-4 rounded-full shadow-md mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Project Allocation System
          </h1>
          <p className="mt-2 text-md text-gray-600">
            Sign in to continue
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            {/* Role Selector */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                id="role"
                name="role"
                className="w-full bg-slate-50 border border-gray-200 rounded-lg py-3 pl-12 pr-10 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="supervisor">Supervisor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 transition-transform transform hover:scale-105"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
                &larr; Back to home
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Accounts Info */}
        <div className="mt-6 bg-slate-100/70 p-4 rounded-lg border border-slate-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-2 text-center">Demo Accounts</h4>
          <div className="text-xs text-gray-600 space-y-1.5 text-center">
            <p><strong>Student:</strong> Create a new student via admin panel</p>
            <p><strong>Supervisor:</strong> Create via user registration</p>
            <p><strong>Admin:</strong> Create via user registration</p>
          </div>
        </div>
      </div>
    </div>
  );
}