import { useState } from "react";

const useUpdateTask = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateTask = async (task, id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://project-manager-4gpt.onrender.com/api/v1/task/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }
      const result = await response.json();
      setTask(result);
      return result;
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { task, loading, error, updateTask };
};

export default useUpdateTask;
