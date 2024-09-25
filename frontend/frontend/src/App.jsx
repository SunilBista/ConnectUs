import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider } from "./context/Auth";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import SignUp from "./components/Authentication/Signup";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
