import { useEffect, useState } from "react";
import useGetProjectsData from "../../../../Hooks/Project/Get/UseGetProjectsData.jsx";
import useGetUsersData from "../../../../Hooks/User/Get/useGetUsersData.jsx";
import useGetTasksData from "../../../../Hooks/Task/Get/useGetTasksData.jsx";
import useUpdateTask from "../../../../Hooks/Task/Put/useUpdateTask.jsx";
import Form from "../../../General/Form.jsx";
import Input from "../../../General/Input.jsx";
import Select from "../../../General/Select.jsx";

const FormUpdateTask = ({ onUserAction }) => {
  const { tasks } = useGetTasksData();
  const { projects } = useGetProjectsData();
  const { users, fetchUsers } = useGetUsersData();
  const { updateTask } = useUpdateTask();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
    projectId: null,
    userId: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getUsersData = async () => {
    setLoading(true);
    const usersData = await fetchUsers();
    setUsers(usersData);
    setLoading(false);
  };

  const getTasksData = async () => {
    setLoading(true);
    const tasksData = await fetchTasks();
    setTasks(tasksData);
    setLoading(false);
  };

  useEffect(() => {
    getTasksData();
    getUsersData();
  }, []);

  const handleSelect = (e) => {
    const { name, value } = e.target;
    if (name === "userSelect") {
      const selectedUserId = Number(value);
      setSelectedUserId(selectedUserId);
      setTaskData({
        ...taskData,
        userId: selectedUserId,
      });
    } else if (name === "projectSelect") {
      const selectedProjectId = Number(value);
      setSelectedProjectId(selectedProjectId);
      setTaskData({
        ...taskData,
        projectId: selectedProjectId,
      });
    } else if (name === "taskSelect") {
      const selectedTaskId = Number(value);
      setSelectedTaskId(selectedTaskId);
      const selectedTask = tasks.find((task) => task.id === selectedTaskId);
      setTaskData({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        projectId: selectedTask.projectId,
        userId: selectedTask.userId,
      });
    }
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const responseTaskUpdate = await updateTask(taskData, selectedTaskId);
      if (responseTaskUpdate.error) {
        setError(responseTaskUpdate.error);
        return;
      }

      if (onUserAction) {
        onUserAction();
      }

      setSuccess("Task updated successfully");
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Select
        id="task-select"
        value={selectedTaskId || "0"}
        onChange={handleSelect}
        name="taskSelect"
        required
      >
        <option value="0" disabled>
          {loading ? "Loading tasks..." : "Select a task"}
        </option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </Select>
      {selectedTaskId && (
        <Form action={handleSubmit}>
          <Input
            type="text"
            name="title"
            title="title"
            placeholder="Title"
            minLength={3}
            maxLength={30}
            value={taskData.title}
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
            value={taskData.description}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <Select>
            <option value="0" disabled>
              Select a status
            </option>
            <option value={"pending"}>
              Done
            </option>
            <option value={"pending"}>
              Pending
            </option>
          </Select>

          <label htmlFor="project-select">Choose a project:</label>
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

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button id="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating task..." : "Update task"}
          </button>
        </Form>
      )}
    </>
  );
};

export default FormUpdateTask;
