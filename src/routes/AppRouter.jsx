import Login from "../pages/credantials/Login";
// import React from 'react'
import { Route, Routes, useNavigate } from "react-router";
import Home from "../pages/Home";
import { useEffect } from "react";

function AppRouter() {
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default AppRouter;
