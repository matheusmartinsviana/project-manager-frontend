import { Link } from "react-router-dom";
import style from "./Styles/Error404.module.css";
import pmlogo from "../../assets/pmlogo.webp";
import Footer from "../../Layouts/Footer";
const Error404 = () => {
  return (
    <>
      <div className={style.errorContainer}>
        <img
          src={pmlogo}
          alt="Project Manager Logo"
          height={100}
          width={100}
          title="Project Manager Logo"
        />
        <h2 title="Ops... Page not found">Ops... Page not found</h2>
        <p title="Please return to home page">
          This page probably does not exist, I advise you to return to home
        </p>
        <Link title="Go to home page" to={"/"}>Go to home</Link>
      </div>
      <Footer />
    </>
  );
};

export default Error404;
