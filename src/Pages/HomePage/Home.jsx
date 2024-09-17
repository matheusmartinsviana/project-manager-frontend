import React from "react";
import Button from "../../Components/General/Button";
import style from "./Styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useWallpaper } from "../../Context/WallpaperContext";

const Home = () => {
  const navigate = useNavigate();
  const { background } = useWallpaper();

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <div className={style.userPath}>
        <Button onClick={() => navigate("/project")}>Add a new Project</Button>
        <Button onClick={() => navigate("/task")}>Add a new Task</Button>
      </div>
    </div>
  );
};

export default Home;