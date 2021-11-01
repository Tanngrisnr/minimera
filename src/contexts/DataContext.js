//importerar react, firestore funktioner samt databas från firebase.js
import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  onSnapshot,
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

  const updateUser = (uid, email, group) => {
    setDoc(doc(db, "users", uid), {
      email: email,
      group: group,
    });
  };

  const deleteAd = (adID) => {
    deleteDoc(doc(db, "ads", adID));
  };

  //funktionen inom useEffect hämtar data/annonser en gång när sidan laddas om
  useEffect(() => {
    const data = getDocs(collection(db, "ads")).then((snapshot) => {
      let adlist = snapshot.docs.map((doc) => {
        return {
          adID: doc.id,
          creatorEmail: doc.data().creatorEmail,
          creatorID: doc.data().creatorID,
          title: doc.data().title,
          description: doc.data().description,
          group: doc.data().group,
        };
      });
      setAds(adlist);
      setLoading(false);
    });
    return () => {
      data();
    };
  }, []);

  //useEffect updaterar datan/annonser i realtime när förändringar sker i databasen
  useEffect(() => {
    const q = query(collection(db, "ads"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listedAds = [];
      querySnapshot.forEach((doc) => {
        listedAds.push({
          adID: doc.id,
          creatorID: doc.data().creatorID,
          title: doc.data().title,
          description: doc.data().description,
          group: doc.data().group,
        });
      });

      setAds(listedAds);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = { loading, ads, newAd, updateUser, deleteAd };
  //returnerar en contextprovider som tar emot funktioner samt en lista över data som kan användas i applikationen.
  //:addningsstatet hindrar barn av providern från att vissas innan all data har hämtats.
  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
