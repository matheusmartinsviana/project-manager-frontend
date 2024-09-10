import { useState, useEffect } from "react";
import useAddProject from "../../../../Hooks/Project/Post/useAddProject.jsx";
import Form from "../../../General/Form";
import useGetProjectsData from "../../../../Hooks/Project/Get/UseGetProjectsData.jsx";
import Input from "../../../General/Input";
import Select from "../../../General/Select.jsx";
import useGetUsersData from "../../../../Hooks/User/Get/useGetUsersData.jsx";

const FormAddProject = ({ onUserAction }) => {
    const { addProject } = useAddProject();
    const { fetchProjects } = useGetProjectsData();
    const { fetchUsers } = useGetUsersData();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        userId: null,
    });

    useEffect(() => {
        const getUsersData = async () => {
            setLoading(true);
            const usersData = await fetchUsers();
            setUsers(usersData);
            setLoading(false);
        };

        getUsersData();
    }, []);

    const handleUserSelect = (e) => {
        const selectedUserId = Number(e.target.value);
        setSelectedUserId(selectedUserId);
        setProjectData({
            ...projectData,
            userId: selectedUserId,
        });
    };

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSuccess("");
        setError("");

        try {
            const responseProjectAdd = await addProject(projectData);
            if (responseProjectAdd.error) {
                return setError(responseProjectAdd.error);
            }

            const getProjects = await fetchProjects();
            if (onUserAction) {
                onUserAction(getProjects);
            }

            setSuccess("Project added successfully");
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Form action={handleSubmit}>
                Add project
                <Input
                    type="text"
                    name="name"
                    title="name"
                    placeholder="Name"
                    minLength={3}
                    maxLength={30}
                    value={projectData.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
                <Input
                    type="text"
                    name="description"
                    title="description"
                    placeholder="Description"
                    maxLength={100}
                    value={projectData.description}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />

                <label htmlFor="user-select">Choose a user for this project:</label>
                <Select
                    id="user-select"
                    value={selectedUserId || "0"}
                    onChange={handleUserSelect}
                    required
                >
                    <option value="0" disabled>
                        {loading ? "Loading users..." : "Select a user"}
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.email}
                        </option>
                    ))}
                </Select>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <button
                    id="submit-button"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Adding project..." : "Add project"}
                </button>
            </Form>
        </>
    );
};

export default FormAddProject;