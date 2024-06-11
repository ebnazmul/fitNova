import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthContexts = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
      });
      return () => unsubscribe()
  }, []);

  const emailSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const emailSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const continueWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const value = {
    emailSignUp,
    emailSignIn,
    continueWithGoogle,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContexts;
