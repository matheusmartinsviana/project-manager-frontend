// src/pages/Home.js
import React from "react";
import Button from "../../Components/General/Button";
import style from "./Styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useWallpaper } from "../../Context/WallpaperContext";

const wallpapers = [
  "public/4002676.jpg",
  "public/another-wallpaper.jpg",
  "public/yet-another-wallpaper.jpg",
];

const Home = () => {
  const navigate = useNavigate();
  const { background, setBackground } = useWallpaper();

  const handleWallpaperChange = (event) => {
    setBackground(event.target.value);
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <div className={style.wallpaperSelector}>
        {wallpapers.map((wallpaper, index) => (
          <label key={index} className={style.wallpaperOption}>
            <input
              type="radio"
              name="wallpaper"
              value={wallpaper}
              checked={background === wallpaper}
              onChange={handleWallpaperChange}
              className={style.wallpaperRadio}
            />
            <img
              src={wallpaper}
              alt={`Wallpaper ${index}`}
              className={style.wallpaperPreview}
            />
          </label>
        ))}
      </div>
      <div className={style.userPath}>
        <Button onClick={() => navigate("/user")}>Add a new User</Button>
        <Button onClick={() => navigate("/project")}>Add a new Project</Button>
        <Button onClick={() => navigate("/task")}>Add a new Task</Button>
      </div>
    </div>
  );
};

export default Home;
