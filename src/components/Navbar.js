import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

const Navbar = () => {
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
          <Link component={RouterLink} to="/" color="inherit" underline="none">
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
