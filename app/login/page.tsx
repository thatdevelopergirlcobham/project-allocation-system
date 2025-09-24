'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/Toast';
import { GraduationCap, Mail, Lock, User, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '../../types';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as UserRole
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login(formData);
    
    if (result.success) {
      addToast({
        type: 'success',
        title: 'Login successful',
        message: 'Redirecting to dashboard...'
      });
      router.push('/dashboard');
    } else {
      addToast({
        type: 'error',
        title: 'Login failed',
        message: result.message
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mx-auto w-fit bg-white p-4 rounded-full shadow-lg mb-4 border-2 border-indigo-100">
            <GraduationCap className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Project Allocation System
          </h1>
          <p className="mt-2 text-md text-gray-600">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg py-3 pl-12 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* Role Selector */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Login As
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 pointer-events-none" />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                <select
                  id="role"
                  name="role"
                  className="w-full bg-slate-50 border border-gray-300 rounded-lg py-3 pl-12 pr-10 text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-colors shadow-md"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm">
              <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Create an account
              </Link>
            </div>
            <div className="text-sm">
              <Link href="/" className="font-medium text-gray-600 hover:text-gray-500">
                Back to home
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Accounts Info */}
        <div className="mt-6 bg-white p-4 rounded-lg border border-indigo-100 shadow-md">
          <h4 className="text-sm font-semibold text-gray-800 mb-2 text-center">Demo Accounts</h4>
          <div className="text-xs text-gray-600 space-y-2">
            <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
              <span><strong>Student:</strong></span>
              <span>Create via registration or admin panel</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
              <span><strong>Supervisor:</strong></span>
              <span>Create via user registration</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
              <span><strong>Admin:</strong></span>
              <span>Create via user registration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}