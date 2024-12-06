/* eslint-disable react/prop-types */

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";

// Create a context for Auth
const AuthContext = createContext();

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Provide the Auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Get user information from Firebase and check the localStorage on component mount
  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        // console.log(user);
        // localStorage.setItem("userId", user.uid); // Save userId in localStorage
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem("userId"); // Remove userId from localStorage if signed out
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
