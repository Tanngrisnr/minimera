import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
export default function Navigation() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);
  if (currentUser) {
    return (
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={currentRoute}>
          <BottomNavigationAction
            component={Link}
            to="/"
            value="/"
            label="Hem"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            value="/create-ad"
            to="create-ad"
            label="Annons"
            icon={<AddCircleIcon />}
          />
          <BottomNavigationAction
            component={Link}
            value="/about"
            to="about"
            label="Om"
            icon={<InfoIcon />}
          />
          <BottomNavigationAction
            component={Link}
            value="/profile"
            to="profile"
            label="Profil"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Paper>
    );
  } else {
    return null;
  }
}
