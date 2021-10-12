import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/create-ad">Create ad</Link>
        <Link to="/profile">Profile page</Link>
      </div>
    );
  } else {
    return null;
  }
}
