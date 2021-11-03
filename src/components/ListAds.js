import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

const AdCard = styled.article`
  margin: 2%;
  flex-basis: 46%;
  min-height: 130px;
  max-height: 170px;
  min-width: 130px;
  background-color: #ebf4f3;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 5%;

  a {
    color: black;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.7em;
    padding-bottom: 2%;
    width: 100%;
  }

  header {
    display: flex;
    align-content: center;
    width: 100%;
    h5 {
      padding: 0;
      margin: 1%;
      font-size: 1em;
      font-weight: bold;
      flex-grow: 1;
    }
  }
  footer {
    width: 100%;
    display: flex;
    align-content: flex-end;
    justify-content: flex-end;
    margin: 0;
  }
`;

const AdsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
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
      setError("Kunde ej ta bort annons");
    }
  };

  return (
    <AdCard aria-label="ad">
      <header>
        <h5>{ad.title}</h5>
      </header>
      {error && <span>{error}</span>}
      <Link to={"/ad/" + ad.adID}>{ad.description}</Link>
      <footer>
        {currentUser.uid == ad.creatorID ? (
          <IconButton
            size="small"
            sx={{ color: "black" }}
            disabled={loading}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        ) : null}
      </footer>
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
