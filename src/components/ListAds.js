import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";

const AdCard = styled.article`
  margin: 2%;
  flex-basis: 46%;
  background-color: #ebf4f3;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  flex-grow: 0;

  p {
    max-height: 78px;
    overflow: hidden;
  }

  header {
    h5 {
      padding: 0;
      margin: 0;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;

const AdsContainer = styled.div`
  align-content: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
        {currentUser.uid === ad.adID ? (
          <button disabled={loading} onClick={handleDelete}>
            X
          </button>
        ) : null}
      </header>
      {error && <div>{error}</div>}
      <p>{ad.description}</p>
      <Link to={"/ad/" + ad.adID}>show full ad</Link>
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
