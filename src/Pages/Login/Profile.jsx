import { useEffect, useRef, useState } from "react";
import defaultPhoto from "../../assets/defaultPhoto.webp";
import { useWallpaper } from "../../Context/WallpaperContext"; // Import the wallpaper context
import useLogout from "../../Hooks/Logout/useLogout";
import style from "./Styles/Profile.module.css";

const wallpapers = [
  "src/assets/backgrounds/bg1.webp",
  "src/assets/backgrounds/bg2.webp",
  "src/assets/backgrounds/bg3.webp",
]; // Wallpaper options

export default function Profile() {
  const { logout } = useLogout();
  const [profilePhoto, setProfilePhoto] = useState(
    () => localStorage.getItem("profilePhoto") || ""
  );
  const [showModal, setShowModal] = useState(false);
  const [showWallpaperModal, setShowWallpaperModal] = useState(false);
  const selectRef = useRef(null);
  const fileInputRef = useRef(null);

  // Manage wallpaper selection
  const { background, setBackground } = useWallpaper();

  const changeProfilePhoto = (profilePhoto) => {
    try {
      if (profilePhoto) {
        localStorage.setItem("profilePhoto", profilePhoto);
      }
    } catch (error) {
      console.error("Failed to save profile photo:", error);
    }
  };

  useEffect(() => {
    changeProfilePhoto(profilePhoto);
  }, [profilePhoto]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    logout();
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const resetDropdown = () => {
    if (selectRef.current) {
      selectRef.current.value = "";
    }
  };

  const handleSelectChange = (e) => {
    if (e.target.value === "changePhoto") {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      resetDropdown();
    } else if (e.target.value === "logout") {
      setShowModal(true);
      resetDropdown();
    } else if (e.target.value === "changeWallpaper") {
      setShowWallpaperModal(true); // Open the wallpaper modal
      resetDropdown();
    }
  };

  const handleWallpaperChange = (event) => {
    setBackground(event.target.value);
  };

  const closeWallpaperModal = () => {
    setShowWallpaperModal(false);
  };

  return (
    <div className={style.profileContainer}>
      <img
        src={profilePhoto || defaultPhoto}
        alt="Profile"
        className={style.profilePhoto}
        loading="lazy"
        height={50}
        width={50}
      />
      <div className={style.profileDetails}>
        <select
          name="options"
          id="options"
          onChange={handleSelectChange}
          className={style.dropdown}
          ref={selectRef}
          aria-haspopup="true"
          aria-expanded={showModal || showWallpaperModal}
        >
          <option value="">Options</option>
          <option value="changePhoto">Change Photo</option>
          <option value="changeWallpaper">Change Wallpaper</option>
          <option value="logout">Logout</option>
        </select>
        <input
          type="file"
          id="photoInput"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
      </div>

      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <p>Are you sure you want to logout?</p>
            <div className={style.modalButtons}>
              <button onClick={handleModalConfirm}>Yes</button>
              <button onClick={handleModalCancel}>No</button>
            </div>
          </div>
        </div>
      )}

      {showWallpaperModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <p>Select a wallpaper:</p>
            <div className={style.wallpaperOptions}>
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
                    loading="lazy"
                    title={`Wallpaper ${index}`}
                    src={wallpaper}
                    alt={`Wallpaper ${index}`}
                    className={style.wallpaperPreview}
                    height={120}
                    width={120}
                  />
                </label>
              ))}
            </div>
            <div className={style.modalButtons}>
              <button onClick={closeWallpaperModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
