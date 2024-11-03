import { useState } from "react";

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (loginInfo) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://project-manager-frontend-slmf.onrender.com/api/v1/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || "Login failed");
        return null;
      }

      const result = await response.json();
      setIsLoggedIn(true);
      return result;
    } catch (err) {
      setError(err.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout, loading, error };
};

export default useLogin;
