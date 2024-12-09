import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
//ADMIN; UPDATE DETAILS; GENERIC PAGE
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            Melosofia
          </Link>
        </Typography>
        {currentUser && (
          <>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            />
            <Button color="inherit">
              <Link
                component={RouterLink}
                to="/home"
                color="inherit"
                underline="none"
              >
                Home
              </Link>
            </Button>
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
            <Button color="inherit">
              <Link
                component={RouterLink}
                to="/profile"
                color="inherit"
                underline="none"
              >
                Profile
              </Link>
            </Button>
          </>
        )}
        {!currentUser && (
          <>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            />
            <Button color="inherit">
              <Link
                component={RouterLink}
                to="/explore"
                color="inherit"
                underline="none"
              >
                Explore
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
            <Button color="inherit">
              <Link
                component={RouterLink}
                to="/login"
                color="inherit"
                underline="none"
              >
                Login
              </Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
