import React, { useState } from 'react';
import Button from '../../Components/General/Button';
import style from './Styles/Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [background, setBackground] = useState("public/4002676.jpg");

    const changeWallpaper = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBackground(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
            <label htmlFor="wallpaper-input">
                <input
                    id="wallpaper-input"
                    type="file"
                    name="wallpaper-changer"
                    onChange={changeWallpaper}
                />
            </label>
            <div className={style.userPath}>
                <Button onClick={() => navigate('/user')}>Add a new User</Button>
                <Button onClick={() => navigate('/project')}>Add a new Project</Button>
                <Button onClick={() => navigate('/task')}>Add a new Task</Button>
            </div>
        </div>
    );
};

export default Home;
