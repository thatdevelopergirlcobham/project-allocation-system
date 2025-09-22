'use client';

import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { GraduationCap, LogOut } from 'lucide-react';

interface NavbarProps {
  showBackButton?: boolean;
  backUrl?: string;
  title?: string;
}

export default function Navbar({ showBackButton = false, backUrl = '/', title }: NavbarProps) {
  const { state, dispatch } = useApp();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {showBackButton ? (
              <Link href={backUrl} className="flex items-center text-indigo-600 hover:text-indigo-700 mr-4">
                ← Back
              </Link>
            ) : null}
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              {title || 'Project Allocation System'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {state.user ? (
              <>
                <span className="text-gray-700">Welcome, {state.user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
