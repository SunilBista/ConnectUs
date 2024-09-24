import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../services/authService";
import { AuthContext } from "../../context/Auth";

const Login = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", user);
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("response", response);
      const userResponse = await getUser();
      setUser(userResponse?._id);
      console.log("userResponse", userResponse);
      if (response?.token) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
