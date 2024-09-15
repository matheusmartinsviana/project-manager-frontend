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
  const { users, loading: usersLoading, error: usersError } = useGetUsersData(); // Handle loading and error in the hook
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    userId: "",
  });

  useEffect(() => {
    // Ensure users data is loaded before rendering
  }, [users]);

  const handleUserSelect = (e) => {
    const selectedUserId = e.target.value;
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
    <Form action={handleSubmit}>
      <h2>Add Project</h2>
      <Input
        type="text"
        name="name"
        title="Name"
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
        title="Description"
        placeholder="Description"
        maxLength={100}
        value={projectData.description}
        onChange={handleChange}
        required
        autoComplete="off"
      />
      {/* <label htmlFor="user-select">Choose a user for this project:</label>
      <Select
        id="user-select"
        value={projectData.userId}
        onChange={handleUserSelect}
        required
      >
        <option value="" disabled>
          {usersLoading ? "Loading users..." : "Select a user"}
        </option>
        {!usersLoading && !usersError && users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </Select> */}
      {usersError && <p className="error-message">{usersError}</p>}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button id="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding project..." : "Add project"}
      </button>
    </Form>
  );
};

export default FormAddProject;
