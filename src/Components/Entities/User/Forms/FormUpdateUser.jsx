import { useState, useEffect } from "react";
import useAddUser from "../../../../Hooks/User/Post/useAddUser";
import Form from "../../../General/Form";
import useGetUsersData from "../../../../Hooks/User/Get/useGetUsersData";
import Input from "../../../General/Input";
import useUpdateUser from "../../../../Hooks/User/Put/useUpdateUser";
import Select from "../../../General/Select";

const FormUpdateUser = ({ onUserAction }) => {
    const { updateUser } = useUpdateUser();
    const { fetchUsers } = useGetUsersData();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [userUpdatedData, setUserUpdatedData] = useState({
        name: "",
        email: "",
        password: ""
    });

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

    const handleChange = (e) => {
        setUserUpdatedData({
            ...userUpdatedData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSuccess("");
        setError("");

        try {
            console.log(selectedUserId)
            const responseUserUpdate = await updateUser(userUpdatedData, selectedUserId);
            if (responseUserUpdate.error) {
                return setError(`Error: ${responseUserUpdate.error}`);
            }

            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            if (onUserAction) {
                onUserAction(updatedUsers);
            }

            setSuccess("User updated successfully");
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Form>
                <label htmlFor="user-select">Choose a user to update:</label>
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
            </Form>

            {selectedUserId && (
                <Form action={handleSubmit}>
                    <h3>Update User</h3>
                    <Input
                        type="text"
                        name="name"
                        title="name"
                        placeholder="Name"
                        minLength={3}
                        maxLength={30}
                        value={userUpdatedData.name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <Input
                        type="email"
                        name="email"
                        title="email"
                        placeholder="Email"
                        maxLength={100}
                        value={userUpdatedData.email}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <Input
                        type="password"
                        name="password"
                        title="password"
                        placeholder="Password"
                        maxLength={40}
                        value={userUpdatedData.password}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <button
                        name="update-button"
                        id="submit-button"
                        type="submit"
                        disabled={isSubmitting ? true : false}
                    >
                        {isSubmitting ? "Updating user..." : "Update user"}
                    </button>
                </Form>
            )}
        </>
    );
};

export default FormUpdateUser;