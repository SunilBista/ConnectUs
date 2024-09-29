import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const AppShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="app-shell flex min-h-screen">
      <button
        className="lg:hidden p-4 text-icon-color fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          className={`${
            isSidebarOpen ? "text-icon-color" : "text-primary-text-color"
          } lg:translate-x-0`}
          icon={faBars}
          size="2x"
        />
      </button>

      <div
        className={`fixed lg:relative z-40 transition-transform duration-300 lg:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      <div
        className={`content flex-grow transition-all duration-300 ${
          isSidebarOpen ? "ml-20" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AppShell;
