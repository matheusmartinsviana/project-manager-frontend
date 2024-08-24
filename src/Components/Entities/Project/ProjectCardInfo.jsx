import getProjectsData from "../../../Hooks/Project/Get/UseGetProjectsData"
import CardInfo from "../../General/CardInfo"
import style from "./Styles/ProjectCardInfo.module.css"

const ProjectCardInfo = (() => {
    const { projects, loading, error } = getProjectsData()
    if (loading) return <p>Loading projects...</p>
    if (error) return <p>{error}</p>
    if (projects.length === 0) return <p>Any projects are created</p>

    return (
        <div className={style.projectCardInfo}>
            {
                projects.map((project) => {
                    return (
                        <CardInfo>
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