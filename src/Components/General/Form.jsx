import style from "./Styles/Form.module.css";

const Form = ({ action, children }) => {
    return (
        <form className={style.form} onSubmit={action}>
            {children}
        </form>
    );
};

export default Form;