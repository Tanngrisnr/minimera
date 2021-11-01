import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { StyledForm } from "./styles";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setLoading(false);
      setMessage("Check your email inbox for further instructions");
    } catch {
      setError("Failed to reset");
    }
  }

  return (
    <>
      <StyledForm>
        <form onSubmit={handleSubmit}>
          {error && <div>{error}</div>}
          {message && <div>{message}</div>}
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
          <Button
            sx={{ marginTop: "10%" }}
            fullWidth
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Återställ lösenord
          </Button>
        </form>
        <div>
          <Link to="/login">Log in</Link>
        </div>
        <div>
          Har du ej ett konto? <Link to="/signup">Skapa konto.</Link>
        </div>
      </StyledForm>
    </>
  );
}
