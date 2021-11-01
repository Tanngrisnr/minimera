import React, { useState } from "react";
import ListAds from "./ListAds";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { StyledHeader } from "./styles";
export default function Dashboard() {
  const { currentUser } = useAuth();
  const { ads } = useData();
  console.log(currentUser);
  return (
    <>
      <StyledHeader>
        <h2>Dashboard</h2>
      </StyledHeader>

      <ListAds
        ads={ads.filter((ad) => {
          return ad.group === currentUser.group;
        })}
      />
    </>
  );
}
