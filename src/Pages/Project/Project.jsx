import React, { useEffect, useState } from 'react';
import '../../assets/Styles/Modal.css';
import FormAddProject from '../../Components/Entities/Project/Forms/FormAddProject.jsx';
import FormUpdateProject from '../../Components/Entities/Project/Forms/FormUpdateProject.jsx';
import ProjectCardInfo from '../../Components/Entities/Project/ProjectCardInfo.jsx';
import Button from '../../Components/General/Button.jsx';
import CountView from '../../Components/General/CountView.jsx';
import LoginVerification from '../../Components/General/LoginVerification.jsx';
import { useModal } from '../../Context/useModal.jsx';
import style from './Styles/Project.module.css';
import FormDeleteProject from '../../Components/Entities/Project/Forms/FormDeleteProject.jsx';
import useGetProjectsData from '../../Hooks/Project/Get/UseGetProjectsData.jsx';

export default function Project() {
    const { openModal } = useModal();
    const { projects, loading, error, fetchProjects } = useGetProjectsData()
    const [projectsData, setprojectsData] = useState(projects);

    useEffect(() => {
        setprojectsData(projects);
    }, [projects]);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='container'>
            <CountView path="project" />
            <LoginVerification />
            <ProjectCardInfo projects={projectsData} />
            <div className={style.buttonsContainer}>
                <Button children='Add a new project' onClick={() => handleOpenModal("add")} />
                <Button children='Update project' onClick={() => handleOpenModal("update")} />
                <Button children='Delete project' onClick={() => handleOpenModal("delete")} />
            </div>
            <div className={style.modalContainer}></div>
        </div>
    );
}