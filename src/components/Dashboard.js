import React, { useState } from "react";
import ListAds from "./ListAds";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
export default function Dashboard() {
  const { currentUser } = useAuth();
  const { ads } = useData();
  console.log(currentUser);
  return (
    <div>
      <h2>Dashboard</h2>
      <ListAds
        ads={ads.filter((ad) => {
          return ad.group === currentUser.group;
        })}
      />
    </div>
  );
}
