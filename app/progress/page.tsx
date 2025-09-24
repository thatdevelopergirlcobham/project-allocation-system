'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';

export default function Progress() {
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!state.user) {
      router.push('/login');
      return;
    }

    // Redirect based on user role
    if (state.user.role === 'student') {
      router.push('/student/progress');
    } else if (state.user.role === 'supervisor') {
      router.push('/supervisor/progress');
    } else {
      router.push('/dashboard');
    }
  }, [state.user, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
