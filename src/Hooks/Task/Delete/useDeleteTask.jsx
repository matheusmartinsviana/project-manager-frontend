const useDeleteTask = () => {
  const deleteTask = async (id) => {
    try {
      const response = fetch(
        `https://project-manager-74i7.onrender.com/api/v1/task/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      return "Task deleted";
    } catch (error) {
      return error.message;
    }
  };
  return { deleteTask };
};

export default useDeleteTask;
