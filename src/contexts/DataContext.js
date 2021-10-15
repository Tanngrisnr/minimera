import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "./../Firebase";

const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const newAd = (id, email, adTitle, adDescription, adGroup) => {
    addDoc(collection(db, "ads"), {
      creatorID: id,
      creatorEmail: email,
      title: adTitle,
      description: adDescription,
      group: adGroup,
    });
  };

  const deleteAd = (adID) => {
    deleteDoc(doc(db, "ads", adID));
  };

  useEffect(() => {
    const data = getDocs(collection(db, "ads")).then((snapshot) => {
      console.log("hello from useEffect");
      let adlist = snapshot.docs.map((doc) => {
        return {
          adID: doc.id,
          creatorID: doc.data().creatorID,
          title: doc.data().title,
          description: doc.data().description,
          group: doc.data().group,
        };
      });
      setAds(adlist);
      setLoading(false);
    });
    return data;
  }, []);
  const value = { ads, newAd, deleteAd };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
