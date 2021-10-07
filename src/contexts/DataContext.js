import React, { useContext, useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "./../Firebase";

const DataContext = React.createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "ads")).then((snapshot) => {
      let adlist = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setAds(adlist);
    });

    setLoading(false);
  }, []);
  const value = { ads };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
