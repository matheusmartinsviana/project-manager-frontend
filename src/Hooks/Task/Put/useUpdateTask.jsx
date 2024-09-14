import { useState } from "react";

const useUpdateTask = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateTask = async (task, id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://project-manager-74i7.onrender.com/api/v1/task/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
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
