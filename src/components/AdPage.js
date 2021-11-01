import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const AdContainer = styled.div`
  margin: 2%;
  min-width: 200px;
  background-color: #ebf4f3;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  padding: 5%;

  header {
    display: flex;
    align-content: center;
    h3 {
      padding: 0;
      margin: 1%;

      font-weight: bold;
      flex-grow: 2;
    }
    button {
      justify-self: flex-end;
    }
  }
`;

export default function AdPage() {
  const { id } = useParams();
  const { ads } = useData();
  const [showEmail, setShowEmail] = useState(false);
  const [ad] = useState(
    ads.find((ad) => {
      return ad.adID === id;
    })
  );

  return (
    <AdContainer>
      <header>
        <h3>{ad.title}</h3>
        <IconButton
          size="large"
          sx={{ color: "black" }}
          component={Link}
          to="/"
        >
          <CloseIcon />
        </IconButton>
      </header>
      <p>{ad.description}</p>
      <Button
        sx={{ marginTop: "10%" }}
        fullWidth
        variant="contained"
        onClick={() => {
          setShowEmail(!showEmail);
        }}
      >
        {showEmail ? ad.creatorEmail : "Kontakta annonsör"}
      </Button>
    </AdContainer>
  );
}
