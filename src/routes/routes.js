import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login/Login";
import Song from "../pages/Song/Song";
import Home from "../pages/Home/Home";
import Signup from "../pages/Login/Signup";
import Landing from "../pages/Landing/Landing";
import ProtectedRoute from "./ProtectedRoutes";
const AppRoutes = () => {
  const protectedRoutes = [
    { path: '/', component: Home },
    { path: '/s/:song_id', component: Song },
];

  return (
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />

        {/* Protected Routes */}
        {protectedRoutes.map(({ path, component: Component }) => (
                    <Route 
                        key={path} 
                        path={path} 
                        element={

                            <ProtectedRoute>
                                <Layout>
                               
                                <Component />
                                </Layout>
                            </ProtectedRoute>
                        } 
                    />
                ))}
      </Routes>
  );
};

export default AppRoutes;
