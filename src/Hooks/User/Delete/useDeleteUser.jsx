const useDeleteUser = () => {
  const deleteUser = async (id) => {
    try {
      const response = fetch(
        `https://project-manager-74i7.onrender.com/api/v1/user/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      return "User deleted";
    } catch (error) {
      return error.message;
    }
  };
  return { deleteUser };
};

export default useDeleteUser;
