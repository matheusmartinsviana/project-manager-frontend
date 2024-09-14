import { useState, useEffect } from "react";
import style from "./Styles/User.module.css";
import Button from "../../Components/General/Button";
import "../../assets/Styles/Modal.css";
import UserCardInfo from "../../Components/Entities/User/UserCardInfo";
import CountView from "../../Components/General/CountView";
import FormAddUser from "../../Components/Entities/User/Forms/FormAddUser";
import { useModal } from "../../Context/useModal";
import useGetUsersData from "../../Hooks/User/Get/useGetUsersData";
import FormUpdateUser from "../../Components/Entities/User/Forms/FormUpdateUser";
import FormDeleteUser from "../../Components/Entities/User/Forms/FormDeleteUser";
import { useWallpaper } from "../../Context/WallpaperContext";

export default function User() {
  const { openModal } = useModal();
  const { users, loading, error, fetchUsers } = useGetUsersData();
  const [usersData, setUsersData] = useState(users);
  const { background } = useWallpaper();

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  const handleOpenModal = (action) => {
    switch (action) {
      case "add":
        openModal(<FormAddUser onUserAction={fetchUsers} />);
        break;
      case "update":
        openModal(<FormUpdateUser onUserAction={fetchUsers} />);
        break;
      case "delete":
        openModal(<FormDeleteUser onUserAction={fetchUsers} />);
        break;
      default:
        return;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <CountView path="user" />
      <UserCardInfo users={usersData} />
      <div className={style.buttonsContainer}>
        <Button onClick={() => handleOpenModal("add")}>Add a new user</Button>
        <Button onClick={() => handleOpenModal("update")}>Update user</Button>
        <Button onClick={() => handleOpenModal("delete")}>Delete user</Button>
      </div>
      <div className={style.modalContainer}></div>
    </div>
  );
}
