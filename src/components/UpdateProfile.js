import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { StyledForm } from "./styles";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, emailUpdate, passwordUpdate } = useAuth();
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
        <h2>Updatera profil</h2>
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
          <button disabled={loading} type="submit">
            Updatera
          </button>
        </form>
        <div>
          <Link to="/">Avbryt</Link>
        </div>
      </StyledForm>
    </>
  );
}
