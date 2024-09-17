import { useState } from "react";
import useAddProject from "../../../../Hooks/Project/Post/useAddProject.jsx";
import Form from "../../../General/Form";
import useGetProjectsData from "../../../../Hooks/Project/Get/UseGetProjectsData.jsx";
import Input from "../../../General/Input";

// eslint-disable-next-line react/prop-types
const FormAddProject = ({ onUserAction }) => {
  const { addProject } = useAddProject();
  const { fetchProjects } = useGetProjectsData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    userId: "",
  });

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
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button id="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding project..." : "Add project"}
      </button>
    </Form>
  );
};

export default FormAddProject;
