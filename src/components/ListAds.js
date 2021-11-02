import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";

const AdCard = styled(Link)`
  display: block;
  margin: 2%;
  flex-basis: 46%;
  min-width: 130px;
  min-height: 130px;
  background-color: #ebf4f3;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 5%;
  color: black;
  text-decoration: none;

  p {
    display: block;
    overflow: hidden;
    font-size: 0.8rem;
  }

  header {
    display: flex;
    align-content: center;
    h5 {
      padding: 0;
      margin: 1%;
      font-size: 1.1em;
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
    <AdCard to={"/ad/" + ad.adID}>
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
      {error && <span>{error}</span>}
      <p>{ad.description}</p>
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
