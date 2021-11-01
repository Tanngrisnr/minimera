import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { StyledForm } from "./styles";
import { Button } from "@mui/material";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      setTimeout(history.push("/"), 3000);
    } catch {
      setError("Failed to sign in");
    }
  }

  return (
    <>
      <StyledForm>
        <form onSubmit={handleSubmit}>
          {error && <div>{error}</div>}
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              required
            />
          </fieldset>
          <fieldset>
            <legend>Lösenord</legend>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              required
            />
          </fieldset>
          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Logga in
          </Button>
        </form>
        <div>
          <Link to="/forgot-password">Glömt lösenord?</Link>
        </div>
        <footer>
          Har du ej konto? <Link to="/signup">Skapa konto.</Link>
        </footer>
      </StyledForm>
    </>
  );
}
