import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

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
      <div>
        <h2>Log in</h2>
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
          <button disabled={loading} type="submit">
            Log in
          </button>
        </form>
        <div>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
      <div>
        Need an account? <Link to="/signup">Sign up.</Link>
      </div>
    </>
  );
}
