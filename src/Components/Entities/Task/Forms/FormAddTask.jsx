/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../../../General/Input";
import Select from "../../../General/Select";
import useAddTask from "../../../../Hooks/Task/Post/useAddTask";
import Form from "../../../General/Form";
import useGetTasksData from "../../../../Hooks/Task/Get/useGetTasksData";
import useGetProjectsData from "../../../../Hooks/Project/Get/UseGetProjectsData";

const FormAddTask = ({ onUserAction }) => {
  const [selectedProjectId, setSelectedProjectId] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchTasks } = useGetTasksData();
  const [success, setSuccess] = useState("");
  const { fetchAddTask } = useAddTask();
  const { projects, loading, error } = useGetProjectsData();
  const [task, setTask] = useState({
    title: "",
    description: "",
    projectId: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetchAddTask(task);

      const getTasks = await fetchTasks();
      if (onUserAction) {
        onUserAction(getTasks);
      }

      if (response.error) {
        return error;
      }

      setSuccess("Task added successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleProjectSelect = (e) => {
    const selectProjectId = Number(e.target.value);
    setSelectedProjectId(selectProjectId);
    setTask({
      ...task,
      projectId: selectProjectId,
    });
  };

  return (
    <>
      <Form action={handleSubmit}>
        <Input
          type="text"
          name="title"
          title="title"
          placeholder="Title"
          minLength={3}
          maxLength={30}
          value={task.title}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <Input
          type="text"
          name="description"
          title="description"
          placeholder="Description"
          minLength={3}
          maxLength={30}
          value={task.description}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <Select
          id="project-select"
          value={selectedProjectId || "0"}
          onChange={handleProjectSelect}
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
        {error && <p className="error-message">{error}</p>}
        <button id="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding task..." : "Add task"}
        </button>
        {success && <p className="success-message">{success}</p>}
      </Form>
    </>
  );
};

export default FormAddTask;
