import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "./../contexts/DataContext";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { StyledHeader } from "./styles";
import ListAds from "./ListAds";
import styled from "@emotion/styled";

const ProfileContainer = styled.div`
  margin-bottom: 10%;
  width: 100%;
`;

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const { ads } = useData();
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setError("");
      await logout();
      history.push("/landing");
    } catch {
      setError("failed to log out");
    }
  };
  return (
    <>
      <StyledHeader>
        <h2>Min Profil</h2>
      </StyledHeader>
      <ProfileContainer>
        {error && <div>{error}</div>}

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
          Logga ut
        </Button>
      </ProfileContainer>
      <ListAds
        ads={ads.filter((ad) => {
          return ad.creatorID === currentUser.uid;
        })}
      />
    </>
  );
}
