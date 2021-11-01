import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { StyledLink } from "./styles";
import { useAuth } from "./../contexts/AuthContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

const AdCard = styled.article`
  margin: 2%;
  flex-basis: 46%;
  background-color: #ebf4f3;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  flex-grow: 0;
  padding: 5%;

  p {
    max-height: 78px;
    overflow: hidden;
    font-size: 0.8rem;
  }

  header {
    display: flex;
    align-content: center;
    h5 {
      padding: 0;
      margin: 1%;
      font-size: 1rem;
      font-weight: bold;
      flex-grow: 2;
    }
    button {
      justify-self: flex-end;
    }
  }
`;

const AdsContainer = styled.div`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 100%;
`;

function AdItem({ ad }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { deleteAd } = useData();
  const { currentUser } = useAuth();

  const handleDelete = async () => {
    setError("");
    try {
      setError("");
      setLoading(true);
      await deleteAd(ad.adID);
      setLoading(false);
    } catch {
      setError("failed to delete ad");
    }
  };

  return (
    <AdCard>
      <header>
        <h5>{ad.title}</h5>{" "}
        {currentUser.uid == ad.creatorID ? (
          <IconButton
            size="small"
            sx={{ color: "black" }}
            disabled={loading}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        ) : null}
      </header>
      {error && <div>{error}</div>}
      <p>{ad.description}</p>
      <StyledLink to={"/ad/" + ad.adID}>show full ad</StyledLink>
    </AdCard>
  );
}

export default function ListAds({ ads }) {
  return (
    <AdsContainer>
      {ads.map((ad) => (
        <AdItem key={ad.adID} ad={ad} />
      ))}
    </AdsContainer>
  );
}
