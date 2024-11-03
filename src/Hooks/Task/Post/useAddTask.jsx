import { useState } from "react";

const useAddTask = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAddTask = async (task) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://project-manager-frontend-slmf.onrender.com/api/v1/task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(errorMessage);
        return { error: errorMessage };
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      console.error("Error adding task:", error);
      setError(`Error adding task: ${error}`);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchAddTask };
};

export default useAddTask;
