import React, { createContext, useState, useEffect, useContext } from "react";
import cookies from "browser-cookies";

import { AuthContext } from "./Auth";
import { getOrgData } from "../services/orgService";

const OrgContext = createContext();

const OrgProvider = ({ children }) => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user = {} } = useContext(AuthContext);

  useEffect(() => {
    const token = cookies.get("token");
    const { organization = "" } = user || {};
    async function fetchData() {
      setLoading(true);
      try {
        if (token && organization) {
          let orgId = organization;
          const response = await getOrgData(orgId);
          console.log("user", response?.data);
          setOrganization(response?.data);
        } else {
          setOrganization(null);
        }
      } catch (error) {
        console.error("Failed to fetch organization data", error);
        setOrganization(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  return (
    <OrgContext.Provider value={{ organization, loading, setOrganization }}>
      {children}
    </OrgContext.Provider>
  );
};

export { OrgContext, OrgProvider };
