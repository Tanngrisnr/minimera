import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useData } from "./../contexts/DataContext";
import { Button } from "@mui/material";
import { StyledForm } from "./styles";

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
          <legend>Titel</legend>
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
          <legend>Beskrivning</legend>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Beskrivning"
            ref={descriptionRef}
            required
          />
        </fieldset>
        <Button fullWidth variant="contained" disabled={loading} type="submit">
          Skapa annons
        </Button>
      </form>
      <div>
        <Link to="/">avbryt</Link>
      </div>
    </StyledForm>
  );
}
