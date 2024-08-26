import { useState, useEffect } from 'react';

const useGetUsersData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://project-manager-74i7.onrender.com/api/v1/user", {
        method: "GET",
        headers: {
          "Authorization": `${localStorage.getItem("token")}`
        }
      });
      if (!response.ok) {
        throw new Error('Error to find users data');
      }
      const data = await response.json();
      setUsers(data);
      return data;
    } catch (err) {
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