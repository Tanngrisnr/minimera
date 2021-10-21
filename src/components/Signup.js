import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const usernameRef = useRef();
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
        groupRef.current.value,
        usernameRef.current.value
      );
      setLoading(false);
      setTimeout(history.push("/"), 3000);
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
              <legend>Username</legend>
              <input
                type="username"
                name="username"
                id="username"
                ref={usernameRef}
                required
              />
            </fieldset>
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
            <fieldset>
              <legend>Select group</legend>

              <select ref={groupRef} name="group" id="group">
                <option value="north">Norr</option>
                <option value="west">Öst</option>
                <option value="south">Söder</option>
                <option value="west">Väst</option>
              </select>
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
