import { useState, useEffect } from "react";
import Form from "../../../General/Form";
import Select from "../../../General/Select";
import useGetProjectsData from "../../../../Hooks/Project/Get/UseGetProjectsData.jsx";
import useDeleteProject from "../../../../Hooks/Project/Delete/useDeleteProject.jsx";

const FormDeleteProject = ({ onUserAction }) => {
  const { deleteProject } = useDeleteProject();
  const { projects, fetchProjects, loading } = useGetProjectsData();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleProjectSelect = (e) => {
    setSelectedProjectId(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedProjectId) return;

    setIsSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const responseProjectDelete = await deleteProject(selectedProjectId);
      if (responseProjectDelete.error) {
        setError(`Error: ${responseProjectDelete.error}`);
      } else {
        setSuccess("Project deleted successfully");
        await fetchProjects();
        if (onUserAction) {
          onUserAction();
        }
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form action={handleSubmit}>
      <label htmlFor="project-select">Choose a project to delete:</label>
      <Select
        id="project-select"
        defaultValue=""
        onChange={handleProjectSelect}
        required
        disabled={loading || projects.length === 0}
      >
        <option value="" disabled>
          {loading ? "Loading projects..." : "Select a project"}
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </Select>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button type="submit" disabled={isSubmitting || !selectedProjectId}>
        {isSubmitting ? "Deleting project..." : "Delete project"}
      </button>
    </Form>
  );
};

export default FormDeleteProject;
