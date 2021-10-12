import React from "react";
import { useData } from "../contexts/DataContext";

export default function ListAds() {
  const { ads } = useData();

  return (
    <>
      <div>showing ads</div>
      <ul>
        {ads.map((ad) => (
          <li key={ad.adID}>
            <strong>{ad.title}</strong>
            <span>{ad.description}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
