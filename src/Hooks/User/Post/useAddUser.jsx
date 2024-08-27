const useAddUser = () => {
    const addUser = async (user) => {
        try {
            const response = await fetch("https://project-manager-74i7.onrender.com/api/v1/user", {
                method: "POST",
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
            console.error('Error adding user:', error);
            return { error: error.message };
        }
    };

    return { addUser };
};

export default useAddUser;
