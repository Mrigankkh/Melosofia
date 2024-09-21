import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login/Login";
import Song from "../pages/Song/Song";
import Home from "../pages/Home/Home";
import Signup from "../pages/Login/Signup";
const AppRoutes = () => {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

        </Route>
        <Route path="/song" element={<Song song_id='1'/>} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

      </Routes>
 );
};

export default AppRoutes;
