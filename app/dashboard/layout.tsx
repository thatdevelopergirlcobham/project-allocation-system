'use client';

import { ReactNode } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AuthCheck from '../../components/AuthCheck';
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

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-indigo-700">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="ml-2 text-lg font-bold">Project System</span>
            </div>
            <button className="lg:hidden" onClick={closeSidebar}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 py-6">
            <div className="mb-8">
              <div className="flex items-center px-2 py-3 mb-2">
                <div className="bg-indigo-700 p-2 rounded-full">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-indigo-200 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                // Skip admin-only items for non-admin users
                if (item.adminOnly && user?.role !== 'admin') {
                  return null;
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-lg transition-colors"
                    onClick={closeSidebar}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}

              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-3 text-indigo-100 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top navbar */}
          <div className="sticky top-0 z-10 bg-white shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <button
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                onClick={toggleSidebar}
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="flex items-center">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthCheck>
  );
}
