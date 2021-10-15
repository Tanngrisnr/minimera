import React, { useState } from "react";
import { useData } from "../contexts/DataContext";

function AdItem({ ad }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { deleteAd } = useData();

  const handleDelete = async () => {
    setError("");
    try {
      setError("");
      setLoading(true);
      deleteAd(ad.adID);
      setLoading(false);
    } catch {
      setError("failed to delete ad");
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <strong>{ad.title}</strong>{" "}
      <button disabled={loading} onClick={handleDelete}>
        X
      </button>
      <p>{ad.description}</p>
    </div>
  );
}

export default function ListAds({ ads }) {
  const [error, setError] = useState();
  const { deleteAd } = useData();

  return (
    <>
      <div>showing ads</div>
      <ul>
        {ads.map((ad) => (
          <li key={ad.adID}>
            <AdItem ad={ad} />
          </li>
        ))}
      </ul>
    </>
  );
}
