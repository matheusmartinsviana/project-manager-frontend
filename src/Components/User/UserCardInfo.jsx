import getUserData from "../../Hooks/User/getUserData"
import CardInfo from "../CardInfo"
import style from "./Style/UserCardInfo.module.css"

const UserCardInfo = (() => {
    const { users, loading, error } = getUserData()

    if (loading) return <p>Carregando...</p>
    if (error) return <p>{error}</p>
    return (
        <div className={style.userCardInfo}>
            {
                users.map((user) => {
                    return (
                        <CardInfo>
                            <p>Id: {user.id}</p>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </CardInfo>
                    )
                })
            }
        </div>
    )
})

export default UserCardInfo