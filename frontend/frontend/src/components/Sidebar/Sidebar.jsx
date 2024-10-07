import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCog,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Button, { COLOR_SCHEME, VARIANT } from "../../widgets/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { OrgContext } from "../../context/Organization";

const Sidebar = () => {
  const { user = {}, handleLogout = null } = useContext(AuthContext);
  const { organization = {} } = useContext(OrgContext);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const profileRef = useRef();

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const handleSettingsNavigate = () => {
    navigate("/settings");
  };

  const handleHomeNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen bg-sidebar-bg-color shadow-shadow-color text-icon-color flex flex-col items-center py-4 lg:w-16 transition-transform duration-300 relative">
      {/* Profile Icon */}
      <div
        className="flex flex-col items-center relative"
        onClick={toggleProfile}
      >
        <Tippy
          className="hidden md:block lg:block"
          content="Profile"
          placement="right"
        >
          <div className="hover:bg-secondary-bg-color hover:text-primary-text-color text-x p-5 transition duration-300 cursor-pointer flex flex-col items-center lg:block">
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span className="mt-1 text-sm block lg:hidden">Profile</span>
          </div>
        </Tippy>

        {/* Profile Popup */}
        {showProfile && (
          <div
            ref={profileRef}
            className="absolute left-16 top-5 bg-white shadow-lg p-4 rounded-md w-max"
          >
            <p className="text-sm font-bold text-primary-text-color md:text-lg">
              {user?.username}
            </p>
            <p className="text-sm text-primary-text-color md:text-lg">
              Timezone: {user?.timezone}
            </p>
            <p className="text-sm text-primary-text-color md:text-lg">
              Organization: {organization?.name}
            </p>
            <div className="mt-4">
              <Button
                onClick={handleLogout}
                isLoading={false}
                variant={VARIANT.CONTAINED}
                colorScheme={COLOR_SCHEME.PRIMARY}
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Icons */}
      <div className="mt-6 space-y-6">
        <Tippy content="Home" placement="right">
          <div
            className={`hover:bg-secondary-bg-color hover:text-primary-text-color p-4 transition duration-300 cursor-pointer ${
              isActive("/dashboard")
                ? "bg-secondary-bg-color text-primary-text-color rounded-none w-16"
                : ""
            }`}
            onClick={handleHomeNavigate}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="mt-1 text-sm block lg:hidden">Home</span>
          </div>
        </Tippy>

        <Tippy content="Settings" placement="right">
          <div
            className={`hover:bg-secondary-bg-color hover:text-primary-text-color p-4 transition duration-300 cursor-pointer ${
              isActive("/settings")
                ? "bg-secondary-bg-color text-primary-text-color rounded-none w-16"
                : ""
            }`}
            onClick={handleSettingsNavigate}
          >
            <FontAwesomeIcon icon={faCog} size="lg" />
            <span className="mt-1 text-sm block lg:hidden">Settings</span>
          </div>
        </Tippy>

        <Tippy content="Notifications" placement="right">
          <div
            className={`hover:bg-secondary-bg-color hover:text-primary-text-color p-4 transition duration-300 cursor-pointer ${
              isActive("/notifications")
                ? "bg-secondary-bg-color text-primary-text-color rounded-none w-16"
                : ""
            }`}
          >
            <FontAwesomeIcon icon={faBell} size="lg" />
            <span className="mt-1 text-sm block lg:hidden">Notifications</span>
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default Sidebar;
