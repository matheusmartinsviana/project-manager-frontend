import style from "./Styles/input.module.css"

const Input = (props) => {
    return (
        <input className={style.styledInput} {...props} />
    )
}

export default Input