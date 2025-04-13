import React, { useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
// import { getLocalStorage, setLocalStorage } from '../utils/helpers';
import axios from '../utils/axiosConfig';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const toast = useToast();

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const updateUser = async (updates) => {
    try {
      setCurrentUser(prev => ({
        ...prev,
        ...updates
      }));
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  const checkAuth = async () => {
    try {
      setAuthLoading(true);
      const response = await axios.post('/api/user/auth');
      const { data } = response.data;
      setUser(data);
      setAuthLoading(false);
      return data;
    } catch (error) {
      // Don't log the error for auth check
      setAuthLoading(false);
      setUser(null);
      return null;
    }
  };

  const login = async (email, password, navigate) => {
    try {
      setAuthLoading(true);
      const response = await axios.post('/api/user/login', { email, password });
      const { data } = response.data;
      setUser(data);
      
      toast({
        position: 'top',
        title: 'Logged In',
        description: `Logged in as ${data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Always redirect to interest selection after login
      navigate('/select-interest');
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      toast({
        position: 'top',
        title: 'Error occurred',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password, avatar, navigate) => {
    try {
      setAuthLoading(true);
      const response = await axios.post('/api/user/register', {
        name,
        email,
        password,
        avatar,
      });
      const { data } = response.data;
      setUser(data);
      toast({
        position: 'top',
        title: 'Registration successful',
        description: `Logged in as ${data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      navigate('/select-interest');
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during registration';
      toast({
        position: 'top',
        title: 'Error occurred',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return null;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/user/logout');
      setUser(null);
      
      toast({
        position: 'top',
        title: 'Success',
        description: 'Logged out successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during logout';
      toast({
        position: 'top',
        title: 'Error occurred',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, authLoading, login, register, logout, checkAuth, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
