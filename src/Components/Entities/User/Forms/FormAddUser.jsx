import { useState } from "react";
import useAddUser from "../../../../Hooks/User/Post/useAddUser";
import Form from "../../../General/Form";
import useGetUsersData from "../../../../Hooks/User/Get/useGetUsersData";
import Input from "../../../General/Input";

const FormAddUser = ({ onUserAction }) => {
    const { addUser } = useAddUser();
    const { fetchUsers } = useGetUsersData();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [isSubmiting, setIsSubmiting] = useState(false)
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
        setIsSubmiting(true)
        setSuccess("")
        setError("")
        try {
            const responseUserAdd = await addUser(userData);
            console.log(responseUserAdd.error)
            if (responseUserAdd.error) {
                return setError(`${responseUserAdd.error}`)
            }

            const getUsers = await fetchUsers();
            if (onUserAction) {
                onUserAction(getUsers);
            }

            setSuccess("User added successfully");

        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setIsSubmiting(false)
        }
    };

    return (
        <Form action={handleSubmit}>
            Add user
            <Input
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
            <Input
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
            <Input
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
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button id="submit-button" type="submit" disabled={isSubmiting ? true : false} >{isSubmiting ? "Adding user..." : "Add user"}</button>
        </Form>
    );
};

export default FormAddUser;