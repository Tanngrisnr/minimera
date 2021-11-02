import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useData } from "./../contexts/DataContext";
import { Button, TextareaAutosize } from "@mui/material";
import { StyledForm, StyledLink } from "./styles";

export default function CreateAd() {
  const titleRef = useRef();
  const { currentUser } = useAuth();
  const { newAd } = useData();
  const descriptionRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      newAd(
        currentUser.uid,
        currentUser.email,
        titleRef.current.value,
        descriptionRef.current.value,
        currentUser.group
      );
      setLoading(false);
      history.push("/");
    } catch {
      setError("Failed to create ad");
    }
  }

  return (
    <StyledForm>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <fieldset>
          <legend>Vad vill du låna ut?</legend>
          <input
            placeholder="Titel"
            type="text"
            name="title"
            id="title"
            ref={titleRef}
            required
          />
        </fieldset>

        <fieldset>
          <legend>Detaljer</legend>
          <TextareaAutosize
            minRows={10}
            maxRows={30}
            type="text"
            name="description"
            id="description"
            placeholder="Skriv gärna vad den är och vilken märke/model.
            Ex: Borrhammare (Bosch UNEO MAXX)."
            ref={descriptionRef}
            required
          />
        </fieldset>
        <Button
          sx={{ marginTop: "10%" }}
          fullWidth
          variant="contained"
          disabled={loading}
          type="submit"
        >
          Skapa annons
        </Button>
      </form>
      <footer>
        <StyledLink to="/">Avbryt</StyledLink>
      </footer>
    </StyledForm>
  );
}
