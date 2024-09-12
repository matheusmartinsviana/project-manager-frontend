import { useEffect, useState } from "react";

const useLogin = ({ loginInfo }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      setIsLoggedIn(result);
      localStorage.setItem("token", result.token);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginInfo.email && loginInfo.password) {
      login();
    }
  }, [loginInfo]);

  return { isLoggedIn, loading, error };
};

export default useLogin;