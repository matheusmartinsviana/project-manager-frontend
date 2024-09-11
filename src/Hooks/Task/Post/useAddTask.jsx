const useAddTask = () => {
  const addTask = async (task) => {
    try {
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
        throw new Error(errorMessage.error);
      }

      return await response.json();
    } catch (error) {
      console.error("Error adding task:", error);
      return { error: error.message };
    }
  };

  return { addTask };
};

export default useAddTask;
