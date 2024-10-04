import makeAPICall from "../api/apiClient";

const getOrgData = async (orgId) => {
  try {
    const response = await makeAPICall({
      method: "GET",
      endpoint: `/api/organization/${orgId}`,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export { getOrgData };
