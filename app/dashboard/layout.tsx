'use client';

import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthCheck from '../../components/AuthCheck';
<<<<<<< HEAD
import Link from 'next/link';
import { 
  LogOut, 
  User, 
  Bell, 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Users, 
  FileText, 
  GraduationCap
} from 'lucide-react';
import { useState } from 'react';
=======
>>>>>>> 31c655f9067ff79ce2395470b38dba5f921a4c08

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
<<<<<<< HEAD
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projects', href: '/dashboard/projects', icon: BookOpen },
    { name: 'Students', href: '/dashboard/students', icon: Users, adminOnly: true },
    { name: 'Supervisors', href: '/dashboard/supervisors', icon: Users, adminOnly: true },
    { name: 'Progress', href: '/dashboard/progress', icon: FileText },
    // { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

=======
>>>>>>> 31c655f9067ff79ce2395470b38dba5f921a4c08
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </AuthCheck>
  );
}
