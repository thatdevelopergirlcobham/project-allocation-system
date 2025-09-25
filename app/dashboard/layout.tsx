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
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/dashboard">
                  <a className="flex items-center px-2 py-2 text-sm font-medium text-gray-700">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Dashboard</span>
                  </a>
                </Link>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`
                          ${item.adminOnly && !user?.isAdmin ? 'hidden' : ''}
                          inline-flex items-center px-1 pt-1 border-b-2
                          text-sm font-medium leading-5 text-gray-500
                          hover:text-gray-700 hover:border-gray-300
                          focus:outline-none focus:text-gray-700 focus:border-gray-300
                          transition duration-150 ease-in-out
                        `}
                      >
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        <span className="ml-2">{item.name}</span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="p-1 border-2 border-transparent rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray transition duration-150 ease-in-out"
                    aria-label="Notifications"
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        className="max-w-xs bg-white rounded-full flex items-center text-sm leading-6 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-label="User menu"
                      >
                        <span className="sr-only">Open user menu</span>
                        <User className="h-5 w-5" aria-hidden="true" />
                        <span className="ml-2 text-gray-700">{user?.name}</span>
                        <Menu className="h-5 w-5 ml-1 text-gray-500" aria-hidden="true" />
                      </button>
                    </div>
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <Link href="/dashboard/profile">
                        <a
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          id="user-menu-item-0"
                          tabIndex="-1"
                        >
                          Your Profile
                        </a>
                      </Link>
                      <Link href="/logout">
                        <a
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          id="user-menu-item-1"
                          tabIndex="-1"
                          onClick={logout}
                        >
                          Sign out
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <button
                    type="button"
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="Toggle sidebar"
                    onClick={toggleSidebar}
                  >
                    <span className="sr-only">Toggle sidebar</span>
                    {sidebarOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex flex-col">
              <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={`
                        ${item.adminOnly && !user?.isAdmin ? 'hidden' : ''}
                        block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100
                      `}
                    >
                      <item.icon className="h-6 w-6 mr-3" aria-hidden="true" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="mt-6 sm:mt-5">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-7 pr-12 text-sm text-gray-500"
                defaultValue={navItems[0].href}
              >
                {navItems.map((item) => (
                  <option key={item.name} value={item.href}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`
                          ${item.adminOnly && !user?.isAdmin ? 'hidden' : ''}
                          border-transparent flex items-center whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300
                        `}
                        aria-current={item.href === window.location.pathname ? 'page' : undefined}
                      >
                        <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthCheck>
  );
}
