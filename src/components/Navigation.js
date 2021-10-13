import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
export default function Navigation() {
  const { currentUser } = useAuth();
  const [value, setValue] = useState(0);
  if (currentUser) {
    return (
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Hem"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="create-ad"
            label="Annons"
            icon={<AddCircleIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="about"
            label="Om"
            icon={<InfoIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="Profile"
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
