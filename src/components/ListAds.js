import React from "react";
import { useData } from "../contexts/DataContext";

export default function ListAds() {
  const { ads } = useData();
  console.log(ads);
  return (
    <>
      <ul>
        {ads.map((ad) => {
          <li key={ad.id}>
            <strong>{ad.data().title}</strong>
            <span>{ad.data().description}</span>
          </li>;
        })}
      </ul>
    </>
  );
}
