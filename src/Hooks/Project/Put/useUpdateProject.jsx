const useUpdateProject = () => {
    const updateProject = async (project, id) => {
        try {
            const response = await fetch(`https://project-manager-74i7.onrender.com/api/v1/project/${id}`, {
                method: "PUT",
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                const errorMessage = await response.json()
                throw new Error(errorMessage.error);
            }

            return await response.json();

        } catch (error) {
            console.error('Error updating project:', error);
            return { error: error.message };
        }
    };

    return { updateProject };
};

export default useUpdateProject;
