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
import { ref, set } from "firebase/database";
import { auth, database } from "./../Firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  /*Users from database */
  const user = (uid) => database.ref(`users/${uid}`);
  const users = () => database.ref("users");

  const writeUserData = (userId, name, email) => {
    set(ref(database, "users/" + userId), {
      username: name,
      email: email,
    });
  };

  const signup = (username, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (authUser) => {
        // Create a user in your Firebase realtime database
        return user(authUser.user.uid).set({
          username,
          email,
          ö,
        });
      }
    );
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
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
