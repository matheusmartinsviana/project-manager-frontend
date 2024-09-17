const useAddProject = () => {
  const addProject = async (project) => {
    try {
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/project",
        {
          method: "POST",
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
      console.error("Error adding project:", error);
      return { error: error.message };
    }
  };

  return { addProject };
};

export default useAddProject;
