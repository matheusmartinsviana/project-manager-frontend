const useDeleteProject = () => {
  const deleteProject = async (id) => {
    try {
      const response = fetch(
        `https://project-manager-4gpt.onrender.com/api/v1/project/${id}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      return "Project deleted";
    } catch (error) {
      return error.message;
    }
  };
  return { deleteProject };
};

export default useDeleteProject;
