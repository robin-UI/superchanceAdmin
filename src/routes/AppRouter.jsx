// import React from 'react'
import Login from "../pages/credantials/Login";
import { Route, Routes, useNavigate } from "react-router";
import Home from "../pages/Home";
import { useEffect } from "react";
import UserList from "../pages/userList/UserList";
import UserDetails from "../pages/userDetails/UserDetails";
import TokenManager from "../utils/Tokenmanage"

function AppRouter() {
  const isLogin = TokenManager.getAccessToken();
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
      <Route path="home" element={<Home />} >
        <Route index element={<UserList />} />
        <Route path="user-detail" element={<UserDetails />} />
      </Route>
      <Route path="*" element={<h1>nopagefound</h1>} />
    </Routes>
  );
}

export default AppRouter;
