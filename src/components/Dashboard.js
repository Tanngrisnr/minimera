import React from "react";
import ListAds from "./ListAds";
import { useAuth } from "../contexts/AuthContext";
export default function Dashboard() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div>
      <h2>Dashboard</h2>
      <ListAds />
    </div>
  );
}
