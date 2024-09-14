import { useState } from "react";

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (loginInfo) => {
    setLoading(true);
    setError(""); // Reset error before trying to log in
    try {
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginInfo.email,
            password: loginInfo.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const result = await response.json();
      setIsLoggedIn(true); // Updated to true if login is successful
      localStorage.setItem("token", result.token);
      return result;
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { isLoggedIn, login, loading, error };
};

export default useLogin;