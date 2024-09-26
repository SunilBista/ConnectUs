import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup, getUser } from "../../services/authService";
import { AuthContext } from "../../context/Auth";
import Button, { COLOR_SCHEME, VARIANT } from "../../widgets/Button/Button";

const SignUp = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [timezone, setTimezone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await signup(username, email, password, timezone);

      const userResponse = await getUser();
      setUser(userResponse?.data?._id);

      if (response?.data?.token) {
        navigate("/dashboard");
      }
    } catch (err) {
      const { data = {} } = err?.response;
      const { message = "", error = {} } = data;
      setError(
        error?.email ||
          error?.password ||
          message ||
          "An error occurred during sign up."
      );
      console.error("Signup failed", message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="h-full overflow-auto min-w-full sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1280px] 2xl:min-w-[1536px] bg-[url('./assets/images/background-green.jpg')] bg-no-repeat bg-bottom bg-cover flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="mb-6">
        <img
          src="./cupastel.ico"
          alt="Connect Us Logo"
          className="mx-auto w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 text-secondary-text-color rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <h2 className="text-xl text-primary-text-color md:text-2xl lg:text-3xl font-bold mb-4 text-center">
          Sign Up for Connect Us
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="placeholder-input-placeholder-color border border-input-border-color  focus:outline-none focus:border-2 focus:border-focus-border-color  p-2 mb-4 w-full rounded text-sm md:text-base lg:text-lg"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="placeholder-input-placeholder-color border border-input-border-color  focus:outline-none focus:border-2 focus:border-focus-border-color  p-2 mb-4 w-full rounded text-sm md:text-base lg:text-lg"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="placeholder-input-placeholder-color border border-input-border-color  focus:outline-none focus:border-2 focus:border-focus-border-color  p-2 mb-4 w-full rounded text-sm md:text-base lg:text-lg"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="text"
          placeholder="Timezone"
          className="placeholder-input-placeholder-color border border-input-border-color  focus:outline-none focus:border-2 focus:border-focus-border-color  p-2 mb-4 w-full rounded text-sm md:text-base lg:text-lg"
          value={timezone}
          onChange={handleTimezoneChange}
          required
        />
        {error && (
          <div className="text-error-text-color text-center mb-4 text-sm md:text-base">
            {error}
          </div>
        )}
        <Button
          type={"submit"}
          isLoading={isLoading}
          variant={VARIANT.CONTAINED}
          colorScheme={COLOR_SCHEME.PRIMARY}
          className="w-full text-sm md:text-base lg:text-lg"
        >
          Sign Up
        </Button>
        <div className="mt-4 text-center text-sm md:text-base">
          <span className="mr-2 text-primary-text-color">
            Already have an Account?
          </span>
          <a href="/login" className="text-blue-500 font-bold">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
