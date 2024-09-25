import makeAPICall from "../api/apiClient";

const login = async (email, password) => {
  try {
    const res = await makeAPICall({
      method: "POST",
      endpoint: "/api/auth/login",
      payload: {
        email,
        password,
      },
      contentType: "application/json",
    });
    console.log(res);
    // if (res.data.token) {
    //   localStorage.setItem("token", res.data.token);
    // }
    return res;
  } catch (err) {
    throw err;
  }
};

const signup = async (username, email, password, timezone) => {
  try {
    const res = await makeAPICall({
      method: "POST",
      endpoint: "/api/auth/signup",
      payload: {
        username,
        email,
        password,
        timezone,
      },
      contentType: "application/json",
    });
    // if (res.data.token) {
    //   localStorage.setItem("token", res.data.token);
    // }
    return res;
  } catch (err) {
    throw err;
  }
};

const getUser = async () => {
  try {
    const res = await makeAPICall({
      method: "GET",
      endpoint: "/api/auth/user",
    });
    console.log(res);
    return res;
  } catch (err) {
    throw err;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, signup, logout, getUser };
