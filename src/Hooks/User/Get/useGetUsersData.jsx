import { useEffect, useState } from "react";

const useGetUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://project-manager-frontend-slmf.onrender.com/api/v1/user/`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Error to find users data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers };
};

export default useGetUsersData;
