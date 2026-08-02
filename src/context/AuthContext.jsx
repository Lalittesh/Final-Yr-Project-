import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Toast notifier function
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    // Restore authentication state from localStorage on initial page load
    const storedStatus = localStorage.getItem('auth_status');
    const storedUser = localStorage.getItem('auth_user');

    if (storedStatus === 'true' && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('auth_status');
        localStorage.removeItem('auth_user');
      }
    }
    
    // Simulate initial application boot loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    // Simulate API delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Retrieve list of registered users from localStorage
    const registeredUsersStr = localStorage.getItem('auth_registered_users') || '[]';
    const registeredUsers = JSON.parse(registeredUsersStr);

    // Default mock user credentials check
    const defaultUsers = [
      {
        email: 'officer@nic.in',
        password: 'password123',
        name: 'Inspector Rajesh Kumar',
        role: 'Legal Metrology Inspector',
        org: 'Delhi Department of Consumer Affairs'
      },
      {
        email: 'manufacturer@parle.com',
        password: 'password123',
        name: 'Anil Sardana',
        role: 'Manufacturer',
        org: 'Parle Products Pvt. Ltd.'
      }
    ];

    const allUsers = [...defaultUsers, ...registeredUsers];
    const matchedUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      showToast('Invalid Email or Password', 'error');
      throw new Error('Invalid email address or password.');
    }

    const sessionUser = {
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      org: matchedUser.org,
      avatarInitial: matchedUser.name.charAt(0).toUpperCase()
    };

    // Store in localStorage
    localStorage.setItem('auth_status', 'true');
    localStorage.setItem('auth_user', JSON.stringify(sessionUser));

    setCurrentUser(sessionUser);
    setIsAuthenticated(true);
    
    showToast('Login Successful', 'success');
    return sessionUser;
  };

  const register = async (name, email, password, org, role) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newUser = {
      name,
      email,
      password,
      org,
      role
    };

    // Save newly registered user into a mock DB inside localStorage
    const registeredUsersStr = localStorage.getItem('auth_registered_users') || '[]';
    const registeredUsers = JSON.parse(registeredUsersStr);

    // Check if email already exists
    if (registeredUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      showToast('Email already registered', 'error');
      throw new Error('Email is already registered in the system.');
    }

    registeredUsers.push(newUser);
    localStorage.setItem('auth_registered_users', JSON.stringify(registeredUsers));
    
    return newUser;
  };

  const logout = () => {
    // Clear localStorage session credentials
    localStorage.removeItem('auth_status');
    localStorage.removeItem('auth_user');
    
    setCurrentUser(null);
    setIsAuthenticated(false);
    
    showToast('Logged Out Successfully', 'success');
  };

  // Expose user and currentUser, loading and isLoading for backwards compatibility
  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        currentUser,
        isAuthenticated,
        loading: isLoading,
        isLoading,
        login,
        register,
        logout,
        toasts,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
