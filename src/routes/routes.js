import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
          <Route path="/signup" element={<Login />} />
          <Route path="/login" element={<Login />} />
      </Routes>
 );
};

export default AppRoutes;
