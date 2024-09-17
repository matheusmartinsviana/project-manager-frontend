import { useEffect, useState } from "react";
import useGetProjectsData from "../../../../Hooks/Project/Get/UseGetProjectsData.jsx";
import useGetUsersData from "../../../../Hooks/User/Get/useGetUsersData.jsx";
import Form from "../../../General/Form.jsx";
import Input from "../../../General/Input.jsx";
import Select from "../../../General/Select.jsx";
import useUpdateProject from "../../../../Hooks/Project/Put/useUpdateProject.jsx";

const FormUpdateProject = ({ onUserAction }) => {
  const { projects } = useGetProjectsData();
  const { updateProject } = useUpdateProject();
  const { fetchUsers } = useGetUsersData();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    userId: null,
  });

  const getUsersData = async () => {
    setLoading(true);
    const usersData = await fetchUsers();
    setUsers(usersData);
    setLoading(false);
  };

  const getProjectsData = async () => {
    setLoading(true);
    const projectsData = await fetchProjects();
    console.log(projectData);
    setProjects(projectsData);
    setLoading(false);
  };

  useEffect(() => {
    getProjectsData();
    getUsersData();
  }, []);

  const handleSelect = (e) => {
    const { name, value } = e.target;
    if (name === "userSelect") {
      const selectedUserId = Number(value);
      setSelectedUserId(selectedUserId);
      setProjectData({
        ...projectData,
        userId: selectedUserId,
      });
    } else if (name === "projectSelect") {
      const selectedProjectId = Number(value);
      setSelectedProjectId(selectedProjectId);
    }
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
      const responseProjectUpdate = await updateProject(
        projectData,
        selectedProjectId
      );
      if (responseProjectUpdate.error) {
        setError(responseProjectUpdate.error);
        return;
      }
      const getProjects = projects;
      if (onUserAction) {
        onUserAction(getProjects);
      }

      setSuccess("Project updated successfully");
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Select
        id="project-select"
        value={selectedProjectId || "0"}
        onChange={handleSelect}
        name="projectSelect"
        required
      >
        <option value="0" disabled>
          {loading ? "Loading projects..." : "Select a project"}
        </option>

        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </Select>
      {selectedProjectId && (
        <Form action={handleSubmit}>
          Update project
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
          {/* <label htmlFor="user-select">Choose a user for this project:</label>
                    <Select
                        id="user-select"
                        value={selectedUserId || "0"}
                        onChange={handleSelect}
                        name="userSelect"
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
                    </Select> */}
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button id="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating project..." : "Update project"}
          </button>
        </Form>
      )}
    </>
  );
};

export default FormUpdateProject;
