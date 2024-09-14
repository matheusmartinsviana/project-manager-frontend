import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Styles/Login.module.css";
import { Link } from "react-router-dom";
import { FaRegShareFromSquare } from "react-icons/fa6";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://project-manager-74i7.onrender.com/api/v1/user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess("Account created successfully");
      setLoading(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (e) {
      setError("Registration failed. Please check your details.");
      setLoading(false);
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
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>
            <div className={style.formInput}>
              <input
                className={style.nameInput}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: Matheus"
                required
              />
              <input
                className={style.emailInput}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
              <input
                className={style.passwordInput}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Write a strong password"
                required
              />
            </div>
            <div className={style.formButton}>
              <button
                className={style.submitButton}
                type="submit"
                disabled={loading}
              >
                Register
              </button>
              <Link to="/login">
                <button className={style.registerButton}>Login</button>
              </Link>
            </div>
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
