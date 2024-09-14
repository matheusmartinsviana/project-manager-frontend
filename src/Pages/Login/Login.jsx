import { useState } from "react";
import style from "./Styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegShareFromSquare } from "react-icons/fa6";
import useLogin from "../../Hooks/Login/useLogin";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { login, loading, error } = useLogin(); // Remove o parâmetro de login
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(loginInfo); // Passa loginInfo para a função login
      if (response && response.token) {
        navigate("/"); // Redireciona para a página inicial se o login for bem-sucedido
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>
        <div className={style.loginAbout}>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            height={80}
            width={80}
          />
          <h2>Project Manager</h2>
          <p>To organize and manage your projects.</p>
          <a
            href="https://github.com/matheusmartinsviana/project-manager-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find out more
            <FaRegShareFromSquare size={16} />
          </a>
        </div>

        <div className={style.formFields}>
          <h4>Login</h4>
          <form onSubmit={handleSubmit}>
            <div className={style.formInput}>
              <input
                className={style.emailInput}
                type="email"
                value={loginInfo.email}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, email: e.target.value })
                }
                placeholder="email@example.com"
                required
              />
              <input
                className={style.passwordInput}
                type="password"
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                placeholder="Write your password"
                required
              />
            </div>

            <div className={style.formButton}>
              <button
                className={style.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <Link to="/register">
                <button className={style.registerButton} type="button">
                  Register
                </button>
              </Link>
            </div>
            {error && <div className={style.error}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
