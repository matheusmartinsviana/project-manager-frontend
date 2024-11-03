const useUpdateProject = () => {
  const updateProject = async (project, id) => {
    try {
      const response = await fetch(
        `https://project-manager-4gpt.onrender.com/api/v1/project/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating project:", error);
      return { error: error.message };
    }
  };

  return { updateProject };
};

export default useUpdateProject;
