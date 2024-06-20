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
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthContexts = ({ children }) => {
  const axiosPublic = useAxiosPublic()


  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        // (user.email);
        setUser(user);
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/jwt`, { email: user.email })
          .then((res) => {
            // (res.data.role);
            setRole(res.data.role);
            localStorage.setItem("token", res.data.token);
            setUserLoading(false);
          });
      } else {
        localStorage.removeItem("token");
        setUserLoading(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const {data: classes = []} = useQuery({
    queryKey: ["classes"],
    queryFn: () => axiosPublic.get('/classes')
  })

 
  const { data: forumPosts = [], refetch: refetchForumData } = useQuery({
    queryKey: ["post-data"],
    queryFn: () => axiosPublic.get("/forum-posts"),
  });


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
    role,
    emailSignUp,
    emailSignIn,
    continueWithGoogle,
    updateUserProfile,
    user,
    setUser,
    userLoading,
    signOutUser,
    classes,
    forumPosts,
    refetchForumData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContexts;
