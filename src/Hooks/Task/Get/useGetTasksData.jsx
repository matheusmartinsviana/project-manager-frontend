import { useEffect, useState } from "react";

const useGetTasksData = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://project-manager-4gpt.onrender.com/api/v1/task",
        {
          method: "GET",
          credentials: "include",
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

export default useGetTasksData;
