import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { StyledForm } from "./styles";

export default function Signup() {
  const groupRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        groupRef.current.value
      );
      setLoading(false);
      setTimeout(history.push("/"), 3000);
    } catch {
      setError("Kunde ej skapa konto");
    }
  }

  return (
    <>
      <StyledForm>
        <div>
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
            <fieldset>
              <legend>Bekräfta lösenord</legend>
              <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                ref={passwordConfirmRef}
                required
              />
            </fieldset>

            <select ref={groupRef} name="group" id="group">
              <option selected disabled value="">
                Välj stadsdel
              </option>
              <option value="north">Norr</option>
              <option value="west">Öst</option>
              <option value="south">Söder</option>
              <option value="west">Väst</option>
            </select>

            <Button
              sx={{ marginTop: "10%" }}
              fullWidth
              variant="contained"
              disabled={loading}
              type="submit"
            >
              Skapa konto
            </Button>
          </form>
        </div>
        <footer>
          <span>
            Har du redan konto? <Link to="/login">Logga in.</Link>
          </span>
        </footer>
      </StyledForm>
    </>
  );
}
