import React from "react";
import { Link } from "react-router-dom";
import style from "./Styles/Login.module.css";
import LoginContent from "./LoginContent";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { AuthProvider } from "../../Context/useAuth";

export default function LoginPage({ form }) {
  return (
    <div className={style.loginContainer}>
        <LoginContent />
        <div className={style.formFields}>
          {form === "login" ? (
            <>
              <h4 title="Welcome!">Welcome again</h4>
              <LoginForm />
              <Link title="Don't have an account? Register now" to="/register">
                Don't have an account? Register now
              </Link>
            </>
          ) : (
            <>
              <h4 title="It's free!">New here? Register now</h4>
              <RegisterForm />
              <Link title="Already have an account? Login" to="/login">
                Already have an account? Login
              </Link>
            </>
          )}
        </div>
    </div>
  );
}
