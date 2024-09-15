import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../Layouts/Body";
import Home from "../Pages/HomePage/Home.jsx";
import Login from "../Pages/Login/LoginForm.jsx";
import Register from "../Pages/Login/RegisterForm.jsx";
import Task from "../Pages/Task/Task.jsx";
import Project from "../Pages/Project/Project.jsx";
import Error404 from "../Pages/Error/Error404.jsx";
import LoginPage from "../Pages/Login/LoginPage.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/task" element={<Task />} />
          <Route path="/login" element={<LoginPage form="login" />} />
          <Route path="/register" element={<LoginPage form="register" />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
