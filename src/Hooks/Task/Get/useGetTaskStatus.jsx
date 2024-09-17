import { useEffect, useState } from "react";

const useGetTasksStatus = (status) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const fetchTasks = async (status) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/task",
        {
          method: "GET",
          credentials: "include",
          body: JSON.stringify({ status: status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get tasks data");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, fetchTasks };
};

export default useGetTasksStatus;
