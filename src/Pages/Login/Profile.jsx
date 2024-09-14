import { useState, useEffect, useRef } from "react";
import style from "./Styles/Profile.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(
    () => localStorage.getItem("profilePhoto") || ""
  );
  const [showModal, setShowModal] = useState(false);
  const selectRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleLogout = async () => {
    try {
      await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/user/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
    handleLogout();
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
    }
  };

  return (
    <div className={style.profileContainer}>
      <img
        src={profilePhoto || "default-profile.png"}
        alt="Profile"
        className={style.profilePhoto}
      />
      <div className={style.profileDetails}>
        <select
          name="options"
          id="options"
          onChange={handleSelectChange}
          className={style.dropdown}
          ref={selectRef}
          aria-haspopup="true"
          aria-expanded={showModal}
        >
          <option value="">Options</option>
          <option value="changePhoto">Change Photo</option>
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
    </div>
  );
}
