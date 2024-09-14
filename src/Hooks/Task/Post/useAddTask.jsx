import { useState } from "react";

const useAddTask = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAddTask = async (task) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/task",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
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