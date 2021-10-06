import React from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export default function Dashboard() {
  const ads = getDocs(collection(db, "ads")).then((snapshot) => {
    snapshot.docs.map((doc) => {
      return doc.data;
    });
  });
  console.log(ads);

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/create-ad">Create ad</Link>
      <Link to="/profile">Profile page</Link>
    </div>
  );
}
