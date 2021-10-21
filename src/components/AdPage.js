import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";

export default function AdPage() {
  const { id } = useParams();
  const { ads } = useData();
  const [ad, setAd] = useState(
    ads.find((ad) => {
      return ad.adID === id;
    })
  );

  return (
    <div>
      <div>param ID: {id}</div>
      <div>Ad ID: {ad.adID}</div>
      <div>{ad.title}</div>
    </div>
  );
}
