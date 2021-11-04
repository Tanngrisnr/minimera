import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { StyledForm, StyledLink } from "./styles";
import { Button } from "@mui/material";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      setTimeout(() => {
        setLoading(false);
        history.push("/");
      }, 3000);
    } catch {
      setError("Failed to sign in");
    }
  };

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
            sx={{ marginTop: "10%" }}
            fullWidth
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Logga in
          </Button>
        </form>

        <footer>
          <span>
            Har du glömt ditt lösenord?{" "}
            <StyledLink to="/forgot-password">Återställ.</StyledLink>
          </span>
          <span>
            Har du redan ett konto?{" "}
            <StyledLink to="/signup">Skapa konto.</StyledLink>
          </span>
        </footer>
      </StyledForm>
    </>
  );
}
