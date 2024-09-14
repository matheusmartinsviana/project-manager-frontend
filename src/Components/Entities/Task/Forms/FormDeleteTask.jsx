import { useState, useEffect } from "react";
import Form from "../../../General/Form";
import Select from "../../../General/Select";
import useGetTasksData from "../../../../Hooks/Task/Get/useGetTasksData.jsx";
import useDeleteTask from "../../../../Hooks/Task/Delete/useDeleteTask.jsx";

const FormDeleteTask = ({ onUserAction }) => {
  const { deleteTask } = useDeleteTask();
  const { tasks, fetchTasks, loading } = useGetTasksData();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleTaskSelect = (e) => {
    setSelectedTaskId(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedTaskId) return;

    setIsSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const responseTaskDelete = await deleteTask(selectedTaskId);
      if (responseTaskDelete.error) {
        setError(`Error: ${responseTaskDelete.error}`);
      } else {
        setSuccess("Task deleted successfully");
        await fetchTasks();
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
      <label htmlFor="task-select">Choose a task to delete:</label>
      <Select
        id="task-select"
        defaultValue=""
        onChange={handleTaskSelect}
        required
        disabled={loading || tasks.length === 0}
      >
        <option value="" disabled>
          {loading ? "Loading tasks..." : "Select a task"}
        </option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </Select>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button type="submit" disabled={isSubmitting || !selectedTaskId}>
        {isSubmitting ? "Deleting task..." : "Delete task"}
      </button>
    </Form>
  );
};

export default FormDeleteTask;
