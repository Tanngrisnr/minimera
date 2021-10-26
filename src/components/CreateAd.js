import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useData } from "./../contexts/DataContext";
import { Button } from "@mui/material";

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
    <>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <fieldset>
          <legend>Title</legend>
          <input type="text" name="title" id="title" ref={titleRef} required />
        </fieldset>
        <fieldset>
          <legend>Description</legend>
          <textarea
            rows="4"
            cols="50"
            type="text"
            name="description"
            id="description"
            ref={descriptionRef}
            required
          />
        </fieldset>
        <Button fullWidth variant="contained" disabled={loading} type="submit">
          Create
        </Button>
      </form>
      <div>
        <Link to="/">avbryt</Link>
      </div>
    </>
  );
}
