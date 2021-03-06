import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 90%;

  header {
    align-self: center;
    margin-top: 45%;
    h1 {
      text-align: center;
      font-size: 4rem;
      width: 100%;
    }
    p {
      font-size: 1.2rem;
      width: 100%;
      margin: 0 auto;
      font-family: "Belleza", serif;
    }
  }
  footer {
    p {
      width: 100%;
      text-align: right;
      a {
        color: white;
      }
    }
  }
  .MuiButton-root {
    background-color: #fafafa;
  }
  .MuiButton-root:hover {
    background-color: #ece6e6;
  }
`;

export default function Landing() {
  return (
    <LandingContainer>
      <header>
        <h1>minimera</h1>
        <p>Låna saker av personer i din närhet istället för att köpa. </p>
      </header>
      <footer>
        <Button
          to="/signup"
          component={Link}
          variant="outlined"
          size="large"
          sx={{ width: "100%" }}
          color="primary"
        >
          Bli Medlem
        </Button>
        <p>
          Redan medlem? <Link to="/login">Logga in</Link>
        </p>
      </footer>
    </LandingContainer>
  );
}
