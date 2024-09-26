import React, { useContext } from "react";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import Button, { COLOR_SCHEME, VARIANT } from "../../widgets/Button/Button";

const Dashboard = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
    <div className="flex justify-center items-center flex-col">
      <h1>Welcome to the dashboard</h1>
      <Button
        onClick={handleLogout}
        isLoading={false}
        variant={VARIANT.CONTAINED}
        colorScheme={COLOR_SCHEME.PRIMARY}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
