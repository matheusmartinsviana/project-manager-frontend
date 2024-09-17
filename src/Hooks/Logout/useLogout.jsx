import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [logouted, setLogouted] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/user/logout",
        {
          method: "POST",
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
      navigate("/login");
      return result;
    } catch (err) {
      setError(err.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};

export default useLogout;
