import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";

export default function Dashboard() {
  const { ads } = useData();

  console.log(ads);
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/create-ad">Create ad</Link>
      <Link to="/profile">Profile page</Link>
    </div>
  );
}
