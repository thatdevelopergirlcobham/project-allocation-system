import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { User, UserRole, AuthResponse, ErrorResponse } from '../types';

interface LoginData {
  email: string;
  password: string;
  role: UserRole;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  matricNumber?: string;
  specialization?: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  signup: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  getCurrentUser: () => User | null;
}

export function useAuth(): UseAuthReturn {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check for user in localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser && !state.user) {
        try {
          const parsedUser = JSON.parse(storedUser) as User;
          dispatch({ type: 'SET_USER', payload: parsedUser });
        } catch (err) {
          console.error('Error parsing stored user:', err);
          localStorage.removeItem('user');
        }
      }
    }
  }, [dispatch, state.user]);

  const signup = async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json() as AuthResponse | ErrorResponse;

      if (!response.ok) {
        const errorData = responseData as ErrorResponse;
        let errorMessage = errorData.error || 'Registration failed';
        
        if (errorData.details) {
          if (Array.isArray(errorData.details)) {
            errorMessage = errorData.details.join(', ');
          } else {
            errorMessage = `${errorMessage}: ${errorData.details}`;
          }
        }
        
        setError(errorMessage);
        setLoading(false);
        return { success: false, message: errorMessage };
      }

      setLoading(false);
      return { 
        success: true, 
        message: 'Registration successful! You can now log in.' 
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Signup error:', errorMessage);
      setError(`Registration failed: ${errorMessage}`);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  const login = async (data: LoginData): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json() as AuthResponse | ErrorResponse;

      if (!response.ok) {
        const errorData = responseData as ErrorResponse;
        const errorMessage = errorData.error || 'Invalid credentials';
        setError(errorMessage);
        setLoading(false);
        return { success: false, message: errorMessage };
      }

      const authData = responseData as AuthResponse;
      
      // Store user in context and localStorage
      dispatch({ type: 'SET_USER', payload: authData.user });
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(authData.user));
      }
      
      setLoading(false);
      return { success: true, message: 'Login successful' };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Login error:', errorMessage);
      setError(`Login failed: ${errorMessage}`);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  const logout = (): void => {
    // Remove user from context and localStorage
    dispatch({ type: 'LOGOUT' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    router.push('/login');
  };

  const getCurrentUser = (): User | null => {
    return state.user;
  };

  return {
    user: state.user,
    loading,
    error,
    signup,
    login,
    logout,
    getCurrentUser,
  };
}
