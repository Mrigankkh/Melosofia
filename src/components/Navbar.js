import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { logout } from "../store/authSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            Melosofia
          </Link>
        </Typography>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} />
        <Button color="inherit">
          <Link
            component={RouterLink}
            to="/explore"
            color="inherit"
            underline="none"
          >
            explore
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            component={RouterLink}
            to="/about"
            color="inherit"
            underline="none"
          >
            About
          </Link>
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
