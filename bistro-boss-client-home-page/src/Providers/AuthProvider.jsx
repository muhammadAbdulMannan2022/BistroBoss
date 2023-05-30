import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase";
import { createContext, useEffect, useState } from "react";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const Authcontext = createContext(null);

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
  const signInWithEmAndPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const createUserWithEmAndPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
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
  const AuthData = {
    user,
    loading,
    logOut,
    signInWithEmAndPass,
    createUserWithEmAndPass,
    loginWithGoogle,
    u: 1,
  };
  return (
    <Authcontext.Provider value={AuthData}>{children}</Authcontext.Provider>
  );
};

export default AuthProvider;
