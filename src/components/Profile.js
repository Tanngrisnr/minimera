import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory;

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("failed to log out");
    }
  };
  return (
    <>
      <h2>Profile</h2>
      <div>
        {error && <div>{error}</div>}
        <div>{currentUser.email}</div>
        <Link to="update-profile">Update profile</Link>
      </div>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
