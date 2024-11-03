const useDeleteProject = () => {
  const deleteProject = async (id) => {
    try {
      const response = fetch(
        `https://project-manager-4gpt.onrender.com/api/v1/project/${id}`,
        {
          credentials: true,
          method: "DELETE",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
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
