/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import "../../assets/Styles/Modal.css";
import FormAddProject from "../../Components/Entities/Project/Forms/FormAddProject.jsx";
import FormUpdateProject from "../../Components/Entities/Project/Forms/FormUpdateProject.jsx";
import ProjectCardInfo from "../../Components/Entities/Project/ProjectCardInfo.jsx";
import Button from "../../Components/General/Button.jsx";
import CountView from "../../Components/General/CountView.jsx";
import { useModal } from "../../Context/useModal.jsx";
import style from "./Styles/Project.module.css";
import FormDeleteProject from "../../Components/Entities/Project/Forms/FormDeleteProject.jsx";
import useGetProjectsData from "../../Hooks/Project/Get/UseGetProjectsData.jsx";
import { useWallpaper } from "../../Context/WallpaperContext.jsx";

export default function Project() {
  const { openModal } = useModal();
  const { fetchProjects } = useGetProjectsData();
  const { background } = useWallpaper();

  const handleOpenModal = (action) => {
    switch (action) {
      case "add":
        openModal(<FormAddProject onUserAction={fetchProjects} />);
        break;
      case "update":
        openModal(<FormUpdateProject onUserAction={fetchProjects} />);
        break;
      case "delete":
        openModal(<FormDeleteProject onUserAction={fetchProjects} />);
        break;
      default:
        return;
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <CountView path="project" />
      <ProjectCardInfo/>
      <div className={style.buttonsContainer}>
        <Button
          children="Add a new project"
          onClick={() => handleOpenModal("add")}
        />
        <Button
          children="Update project"
          onClick={() => handleOpenModal("update")}
        />
        <Button
          children="Delete project"
          onClick={() => handleOpenModal("delete")}
        />
      </div>
      <div className={style.modalContainer}></div>
    </div>
  );
}
