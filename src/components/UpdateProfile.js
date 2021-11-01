import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useHistory } from "react-router-dom";
import { StyledForm, StyledLink } from "./styles";
import { Button } from "@mui/material";
export default function Signup() {
  const groupRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, emailUpdate, passwordUpdate } = useAuth();
  const { updateUser } = useData();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(emailUpdate(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(passwordUpdate(passwordRef.current.value));
    }
    if (groupRef.current.value) {
      promises.push(
        updateUser(
          currentUser.uid,
          emailRef.current.value,
          groupRef.current.value
        )
      );
    }
    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(setLoading(false));
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
              defaultValue={currentUser.email}
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
              placeholder="Lämna blank för att behålla ditt lösenord"
            />
          </fieldset>
          <fieldset>
            <legend>Bekräfta lösenord</legend>
            <input
              type="password"
              name="password-confirm"
              id="password-confirm"
              ref={passwordConfirmRef}
              placeholder="Lämna blank för att behålla ditt lösenord"
            />
          </fieldset>

          <select ref={groupRef} name="group" id="group">
            <option selected disabled value={currentUser.group}>
              Välj stadsdel
            </option>
            <option value="north">Norr</option>
            <option value="west">Öst</option>
            <option value="south">Söder</option>
            <option value="west">Väst</option>
          </select>
          <label for="group">Välj ingen för att behålla nuvarande</label>

          <Button
            sx={{ marginTop: "10%" }}
            fullWidth
            variant="contained"
            disabled={loading}
            type="submit"
          >
            Updatera profil
          </Button>
        </form>
        <div>
          <StyledLink to="/">Avbryt</StyledLink>
        </div>
      </StyledForm>
    </>
  );
}
