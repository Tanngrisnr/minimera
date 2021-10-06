import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const usernameRef = useRef();
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
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
  }

  return (
    <>
      <div>
        <div>
          <h2>Sign Up</h2>
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
              <legend>Password</legend>
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordRef}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Confirm Password</legend>
              <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                ref={passwordConfirmRef}
                required
              />
            </fieldset>
            <button disabled={loading} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        Already have an account? <Link to="/login">Log in.</Link>
      </div>
    </>
  );
}
