import React, { useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signOut,
} from "@firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./../Firebase";

//Skapar context och custom hook för att använda autoriseringsfunktioner i komponenter
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
//custom context-provider som bidrar med funktioner för att göra saker som att skapa nya användare logga in.
//innehåller även en listener som håller koll på om ny användare har skapats och synkroniserar firebase auth med firestore.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, group) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setDoc(doc(db, "users", user.uid), {
          group: group,
          email: user.email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const emailUpdate = (email) => {
    updateEmail(auth.currentUser, email);
  };

  const passwordUpdate = (password) => {
    updatePassword(auth.currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const docRef = doc(db, "users", authUser.uid);
        getDoc(docRef)
          .then((dbUser) => {
            let user = {
              ...authUser,
              ...dbUser.data(),
            };
            setCurrentUser(user);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe();
  }, []);

  const value = {
    loading,
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    passwordUpdate,
    emailUpdate,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
