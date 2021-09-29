import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword } = useAuth();
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
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
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
      <div>
        <div>
          <h2>Update Profile </h2>
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
              <legend>Password</legend>
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </fieldset>
            <fieldset>
              <legend>Confirm Password</legend>
              <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </fieldset>
            <button disabled={loading} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        <Link to="/">Cancel.</Link>
      </div>
    </>
  );
}
