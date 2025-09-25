'use client';

import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthCheck from '../../components/AuthCheck';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </AuthCheck>
  );
}
