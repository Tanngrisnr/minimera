//importerar react, firestore funktioner samt databas från firebase.js
import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./../Firebase";

//skapar context
const DataContext = React.createContext();
//custom hook för att använda funktionerna i kontexten
export const useData = () => {
  return useContext(DataContext);
};
//en custom provider med ett antal funktioner för att lägga till, hämta och uppdatera data från firestore.
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
  //returnerar en contextprovider som tar emot funktioner samt en lista över data som kan användas i applikationen.
  //:addningsstatet hindrar barn av providern från att vissas innan all data har hämtats.
  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
