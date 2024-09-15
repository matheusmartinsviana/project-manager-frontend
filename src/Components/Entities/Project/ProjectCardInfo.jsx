import useGetProjectsData from "../../../Hooks/Project/Get/UseGetProjectsData";
import CardInfo from "../../General/CardInfo";
import style from "./Styles/ProjectCardInfo.module.css";

const ProjectCardInfo = () => {
  const { projects, loading, error } = useGetProjectsData();
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0) return <p>Any projects are created</p>;

  return (
    <div className={style.projectCardInfo}>
      {projects.map((project) => {
        return (
          <CardInfo key={project.id}>
            <p>{new Date(project.createdAt).toDateString()}</p>
            <p>Name: {project.name}</p>
            <p>
              Description:
              <br /> {project.description}
            </p>
          </CardInfo>
        );
      })}
    </div>
  );
};

export default ProjectCardInfo;
