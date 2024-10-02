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
import { OrgProvider } from "./context/Organization";
import AppShell from "./components/AppShell/AppShell";
import Settings from "./components/Settings/Settings";

const App = () => {
  if (typeof global === "undefined") {
    window.global = window;
  }
  return (
    <Router>
      <AuthProvider>
        <OrgProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<AppShell />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </OrgProvider>
      </AuthProvider>
    </Router>
  );
};
export default App;
