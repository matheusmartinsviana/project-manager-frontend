import { useState } from "react";
import useAddUser from "../../../../Hooks/User/Post/useAddUser";
import Form from "../../../General/Form";
import useGetUsersData from "../../../../Hooks/User/Get/useGetUsersData";

const FormAddUser = ({ onUserAdded }) => {
    const { addUser } = useAddUser();
    const { fetchUsers } = useGetUsersData();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess("")
        setError("")
        try {
            const responseUserAdd = await addUser(userData);
            console.log(responseUserAdd.error)
            if (responseUserAdd.error) {
                return setError(`${responseUserAdd.error}`)
            }

            const updatedUsers = await fetchUsers();
            if (onUserAdded) {
                onUserAdded(updatedUsers);
            }

            setSuccess("User added successfully");

        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    };

    return (
        <Form action={handleSubmit}>
            Add user
            <input
                type="text"
                name="name"
                title="name"
                placeholder="Name"
                minLength={3}
                maxLength={30}
                value={userData.name}
                onChange={handleChange}
                required
                autoComplete="off"
            />
            <input
                type="email"
                name="email"
                title="email"
                placeholder="Email"
                maxLength={100}
                value={userData.email}
                onChange={handleChange}
                required
                autoComplete="off"
            />
            <input
                type="password"
                name="password"
                title="password"
                placeholder="Password"
                maxLength={40}
                value={userData.password}
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <button id="submit-button" type="submit">Add user</button>
        </Form>
    );
};

export default FormAddUser;