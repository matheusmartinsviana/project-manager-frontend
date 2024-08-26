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

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addUser(userData);
        const updatedUsers = await fetchUsers();
        if (onUserAdded) {
            onUserAdded(updatedUsers);
        }
    };

    return (
        <Form action={handleSubmit}>
            <input
                type="text"
                name="name"
                title="name"
                minLength={3}
                maxLength={30}
                value={userData.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                title="email"
                maxLength={100}
                value={userData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                title="password"
                maxLength={40}
                value={userData.password}
                onChange={handleChange}
            />
            <button type="submit">Add user</button>
        </Form>
    );
};

export default FormAddUser;