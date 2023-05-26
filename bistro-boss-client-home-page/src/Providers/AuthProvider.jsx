import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";
const auth = getAuth(app);
export const Authcontext = createContext(null);
const signInWithEmAndPass = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const createUserWithEmAndPass = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("log out successfull");
    })
    .catch((err) => {
      console.log(err.massage);
    });
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);
    });
    return () => unsubscribe();
  }, []);
  const AuthData = {
    user,
    loading,
    logOut,
    signInWithEmAndPass,
    createUserWithEmAndPass,
    u: 1,
  };
  return (
    <Authcontext.Provider value={AuthData}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;
