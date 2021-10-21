import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import styled from "styled-components";

const AdCard = styled.article`
  width: 48%;
  background-color: #ebf4f3;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;

const AdsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
        <Typography variant="h5">{ad.title}</Typography>{" "}
        {currentUser.uid === ad.adID ? (
          <button disabled={loading} onClick={handleDelete}>
            X
          </button>
        ) : null}
      </header>
      {error && <div>{error}</div>}
      <Typography variant="body1">{ad.description}</Typography>
      <Button component={Link} to={"/ad/" + ad.adID}>
        show full ad
      </Button>
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
