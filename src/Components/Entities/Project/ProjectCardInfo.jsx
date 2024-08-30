import CardInfo from "../../General/CardInfo"
import style from "./Styles/ProjectCardInfo.module.css"

const ProjectCardInfo = (({ projects }) => {

    if (!projects || projects.length === 0) return <p>No projects are created</p>;

    return (
        <div className={style.projectCardInfo}>
            {
                projects.map((project) => {
                    return (
                        <CardInfo key={project.id}>
                            <p>Name: {project.name}</p>
                            <p>Description: {project.description}</p>
                            <p>User Id: {project.userId}</p>
                        </CardInfo>
                    )
                })
            }
        </div>
    )
})

export default ProjectCardInfo