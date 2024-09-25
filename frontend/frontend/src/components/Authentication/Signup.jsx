import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup, getUser } from "../../services/authService";
import { AuthContext } from "../../context/Auth";

const SignUp = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [timezone, setTimezone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(username, email, password, timezone);
      console.log("Signup response:", response);

      const userResponse = await getUser();
      setUser(userResponse?.data?._id);

      if (response?.data?.token) {
        navigate("/dashboard");
      }
    } catch (err) {
      const { data = {} } = err?.response;
      const { message } = data;
      console.error("Signup failed", message || "Unknown error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mb-4 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="Timezone"
          className="border p-2 mb-4 w-full"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
