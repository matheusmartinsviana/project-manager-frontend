import { FaRegShareFromSquare } from "react-icons/fa6";
import style from "./Styles/Login.module.css";
import SimpleSlider from "../../Components/General/SimpleSlider";
import pmlogo from "../../assets/pmlogo.webp";
import folder from "../../assets/brief.webp";
import tasks from "../../assets/tasks.webp";
const slides = [
  {
    src: pmlogo,
    height: 80,
    width: 80,
    alt: "Welcome to Project Manager App",
    title: "Project Manager",
    description: "To organize and manage your projects.",
  },
  {
    src: folder,
    height: 80,
    width: 80,
    alt: "",
    title: "Management",
    description: "Manage yours projects.",
  },
  {
    src: tasks,
    height: 80,
    width: 80,
    alt: "",
    title: "Organization",
    description: "Organize yours tasks.",
  },
];
const LoginContent = () => {
  return (
    <div className={style.loginAboutBox}>
      <div className={style.loginAbout}>
        <SimpleSlider slides={slides} />
      </div>
      <a
        href="https://github.com/matheusmartinsviana/project-manager-frontend"
        target="_blank"
        rel="noopener noreferrer"
      >
        Find out more
        <FaRegShareFromSquare size={16} />
      </a>
    </div>
  );
};

export default LoginContent;
