import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../Hooks/Login/useLogin";
import style from "./Styles/Login.module.css";

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { login, loading } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await login(loginInfo);
      if (response) {
        navigate("/");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
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
        <button className={style.submitButton} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
}
