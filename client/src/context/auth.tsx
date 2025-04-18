import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'manager' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, role: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient
        .get('/users/current')
        .then((response) => {
          const typedResponse = response as { data: User };
          setUser(typedResponse.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = (await apiClient.post('/users/sign_in', {
        user: { email, password },
      })) as { data: { token: string; user: User } };
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, role: string) => {
    try {
      const response = (await apiClient.post('/users', {
        user: { email, password, role },
      })) as { data: { token: string; user: User } };
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
