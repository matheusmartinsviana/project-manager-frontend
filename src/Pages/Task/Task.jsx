import React, { useEffect } from "react";
import "../../assets/Styles/Modal.css";
import FormAddTask from "../../Components/Entities/Task/Forms/FormAddTask.jsx";
import TaskCardInfo from "../../Components/Entities/Task/TaskCardInfo.jsx";
import Button from "../../Components/General/Button.jsx";
import CountView from "../../Components/General/CountView.jsx";
import { useModal } from "../../Context/useModal.jsx";
import style from "./Styles/Task.module.css";
import useGetTaskData from "../../Hooks/Task/Get/useGetTasksData.jsx";
import FormUpdateTask from "../../Components/Entities/Task/Forms/FormUpdateTask.jsx";
import FormDeleteTask from "../../Components/Entities/Task/Forms/FormDeleteTask.jsx";
import { useWallpaper } from "../../Context/WallpaperContext.jsx";

export default function Task() {
  const { openModal } = useModal();
  const { tasks, loading, error, fetchTasks } = useGetTaskData();
  const { background } = useWallpaper();

  const handleOpenModal = (action) => {
    switch (action) {
      case "add":
        openModal(<FormAddTask onUserAction={fetchTasks} />);
        break;
      case "update":
        openModal(<FormUpdateTask onUserAction={fetchTasks} />);
        break;
      case "delete":
        openModal(<FormDeleteTask onUserAction={fetchTasks} />);
        break;
      default:
        return;
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error}</p>;

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <CountView path="Task" />
      <TaskCardInfo Task={Task} />
      <div className={style.buttonsContainer}>
        <Button onClick={() => handleOpenModal("add")}>Add a new Task</Button>
        <Button onClick={() => handleOpenModal("update")}>Update Task</Button>
        <Button onClick={() => handleOpenModal("delete")}>Delete Task</Button>
      </div>
      <div className={style.modalContainer}></div>
    </div>
  );
}
