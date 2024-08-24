import useGetUsersData from "../../../Hooks/User/Get/useGetUsersData";
import CardInfo from "../../General/CardInfo";
import style from "./Style/UserCardInfo.module.css";

const UserCardInfo = () => {
    const { users, loading, error } = useGetUsersData();

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;
    if (users.length === 0) return <p>Any users are created</p>
    return (
        <div className={style.userCardInfo}>
            {users.map((user) => (
                <CardInfo key={user.id}>
                    <p>Id: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </CardInfo>
            ))}
        </div>
    );
};

export default UserCardInfo;