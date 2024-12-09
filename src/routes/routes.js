import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login/Login";
import Song from "../pages/Song/Song";
import Home from "../pages/Home/Home";
import Signup from "../pages/Login/Signup";
import Landing from "../pages/Landing/Landing";
import About from "../pages/About/About";
import ProtectedRoute from "./ProtectedRoutes";
import User from "../pages/User/User";
import Explore from "../pages/Explore/Explore";
import Profile from "../pages/Profile/Profile";

const AppRoutes = () => {
  const protectedRoutes = [
    { path: '/home', component: Home },
    { path: '/s/:song_id', component: Song },
    {path: '/user/:username', component: User},
    {path: '/profile', component: Profile}

];

  return (
    <Layout>

      <Routes>
        {/* Unprotected Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        {protectedRoutes.map(({ path, component: Component }) => (
                    <Route 
                        key={path} 
                        path={path} 
                        element={

                            <ProtectedRoute>
                               
                                <Component />
                            </ProtectedRoute>
                        } 
                    />
                ))}
      </Routes>
      </Layout>

  );
};

export default AppRoutes;
