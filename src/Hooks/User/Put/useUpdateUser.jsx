const useUpdateUser = () => {
    const updateUser = async (user, id) => {
        try {
            const response = await fetch(`https://project-manager-74i7.onrender.com/api/v1/user/${id}`, {
                method: "PUT",
                body: JSON.stringify(user),
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
            console.error('Error updating user:', error);
            return { error: error.message };
        }
    };

    return { updateUser };
};

export default useUpdateUser;