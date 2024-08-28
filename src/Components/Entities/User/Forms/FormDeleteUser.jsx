import { useState, useEffect } from "react";
import Form from "../../../General/Form";
import useGetUsersData from "../../../../Hooks/User/Get/useGetUsersData";
import useDeleteUser from "../../../../Hooks/User/Delete/useDeleteUser";
import Select from "../../../General/Select";

const FormDeleteUser = ({ onUserAction }) => {
    const { deleteUser } = useDeleteUser();
    const { fetchUsers } = useGetUsersData();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const getUsersData = async () => {
        setLoading(true)
        const usersData = await fetchUsers();
        setUsers(usersData);
        setLoading(false)
    };

    const handleUserSelect = (e) => {
        e.preventDefault()
        const selectedUserId = e.target.value;
        setSelectedUserId(selectedUserId);

        const selectedUser = users.find((user) => user.id === selectedUserId);

        if (selectedUser) {
            setUserUpdatedData({
                name: selectedUser.name,
                email: selectedUser.email,
                password: "",
            })
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSuccess("");
        setError("");

        try {
            const responseUserDelete = await deleteUser(selectedUserId);
            if (responseUserDelete.error) {
                return setError(`Error: ${responseUserDelete.error}`);
            }

            const users = await fetchUsers();
            setUsers(users);
            if (onUserAction) {
                onUserAction(users);
            }

            setSuccess("User deleted successfully");
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Form action={handleSubmit}>
                <label htmlFor="user-select">Choose a user to delete:</label>
                <Select
                    id="user-select"
                    defaultValue="0"
                    onClick={users.length === 0 ? getUsersData : null}
                    onChange={handleUserSelect}
                    required
                >
                    <option value="0" disabled>{loading ? "Loading users..." : "Select a user"}</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.email}
                        </option>
                    ))}
                </Select>


                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button
                    onClick={success ? getUsersData : null}
                    name="update-button"
                    id="submit-button"
                    type="submit"
                    disabled={users ? false : true}
                >
                    {isSubmitting ? "Deleting user..." : "Delete user"}
                </button>
            </Form>
        </>
    );
};

export default FormDeleteUser;