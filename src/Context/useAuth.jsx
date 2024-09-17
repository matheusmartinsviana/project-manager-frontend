import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const url = "https://project-manager-74i7.onrender.com/api/v1/user/auth";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const fetchAuth = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setIsAuthenticated(false);
        navigate("/login");
      }

      const result = await response.json();
      setIsAuthenticated(result.authenticated);
    } catch (e) {
      console.error(e);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, fetchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
