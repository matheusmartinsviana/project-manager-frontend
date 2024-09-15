import getTasksData from "../../../Hooks/Task/Get/useGetTasksData";
import CardInfo from "../../General/CardInfo";
import style from "./Styles/TaskCardInfo.module.css";

const TaskCardInfo = () => {
  const { tasks, loading, error } = getTasksData();
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;
  if (tasks.length === 0) return <p>Any tasks are created</p>;

  return (
    <div className={style.taskCardInfo}>
      {tasks.map((task, index) => {
        return (
          <CardInfo key={index}>
            <p>{new Date(task.createdAt).toDateString()}</p>
            <p>Name: {task.title}</p>
            <p>
              Description: <br />
              {task.description}
            </p>
            <p>Project: {task.project.name}</p>
          </CardInfo>
        );
      })}
    </div>
  );
};

export default TaskCardInfo;
