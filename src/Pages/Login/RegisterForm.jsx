import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Styles/Login.module.css";

export default function RegisterForm() {
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
        "https://project-manager-4gpt.onrender.com/api/v1/user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      setSuccess("Account created successfully. Welcome to project manager!");
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
        <button className={style.submitButton} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </form>
  );
}
