import React, { createContext, useState, useEffect } from "react";
import cookies from "browser-cookies";
import { getUser, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = cookies.get("token");
    async function fetchData() {
      try {
        const userResponse = await getUser();
        console.log("user", userResponse.data);
        setUser(userResponse?.data);
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

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      const { data = {} } = err?.response;
      const { message } = data;
      console.error("Logout failed", data, message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
