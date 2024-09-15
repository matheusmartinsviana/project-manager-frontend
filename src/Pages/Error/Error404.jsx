import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <h2>Ops... </h2>
      <p>
        This page probably does not exist, I advise you to return to the
        <Link to={"/"}>home page</Link>
      </p>
    </>
  );
};

export default Error404;
