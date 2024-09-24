import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import cookies from "browser-cookies";
import { getUser } from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get("token");
    async function fetchData() {
      try {
        const userResponse = await getUser();
        setUser(userResponse?._id);
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
      }
    }
    if (token) {
      fetchData();
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
