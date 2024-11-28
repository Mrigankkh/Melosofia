import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import login from "./store/authSlice";
import { BrowserRouter as Router } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return (
    <Router>
      <div>
        <ToastContainer />
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
