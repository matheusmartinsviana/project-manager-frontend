import { useEffect, useState } from "react";

const useLogout = () => {
  const [logouted, setLogouted] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logout = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/user/logout",
        {
          method: "POST",
          credentials: "include",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || "Login failed");
        return null;
      }

      const result = await response.json();
      setLogouted(result);
      return result;
    } catch (err) {
      setError(err.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    logout();
  });

  return { logouted, loading, error };
};

export default useLogout;
