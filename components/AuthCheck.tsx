'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { Loader2 } from 'lucide-react';

interface AuthCheckProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export default function AuthCheck({ 
  children, 
  allowedRoles = ['admin', 'supervisor', 'student'], 
  redirectTo = '/login' 
}: AuthCheckProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push(redirectTo);
      return;
    }

    // If user exists but doesn't have the required role, redirect
    if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
    }
  }, [user, loading, router, allowedRoles, redirectTo]);

  // Show loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Checking authentication...</h2>
      </div>
    );
  }

  // If user is authenticated and has the required role, render children
  if (user && (allowedRoles.length === 0 || allowedRoles.includes(user.role))) {
    return <>{children}</>;
  }

  // This should not be reached due to the redirects in useEffect
  return null;
}
