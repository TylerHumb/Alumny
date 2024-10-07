// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context for user authentication
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap the app
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // student or employer
  
  // Function to log in (mock)
  const login = (type) => {
    setUserType(type);
  };

  return (
    <UserContext.Provider value={{ userType, login }}>
      {children}
    </UserContext.Provider>
  );
};
