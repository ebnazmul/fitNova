import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase.config";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthContexts = ({ children }) => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/jwt`, { email: user.email })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            setUserLoading(false);
          });
      } else {
        localStorage.removeItem("token");
        setUserLoading(false);
      }
    });
    return () => unsubscribe();
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
  const signOutUser = () => {
    signOut(auth).then(() => {
      setUser({});
      toast.success("Sign Out success");
    });
  };
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const value = {
    emailSignUp,
    emailSignIn,
    continueWithGoogle,
    updateUserProfile,
    user,
    setUser,
    userLoading,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContexts;
