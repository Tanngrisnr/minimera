import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { StyledHeader } from "./styles";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setError("");
      await logout();
      history.push("/login");
    } catch {
      setError("failed to log out");
    }
  };
  return (
    <>
      <StyledHeader>Profile</StyledHeader>
      <div>
        {error && <div>{error}</div>}
        <div>{currentUser.email}</div>
        <Button
          sx={{ marginTop: "10%" }}
          fullWidth
          variant="contained"
          component={Link}
          to="update-profile"
        >
          Update profile
        </Button>
        <Button
          sx={{ marginTop: "10%" }}
          fullWidth
          variant="contained"
          onClick={handleLogout}
        >
          Logg ut
        </Button>
      </div>
    </>
  );
}
