import React from "react";
import { auth, firestore } from "firebaseApp";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export default function Profile({ user }) {
  let navigate = useNavigate();

  const getMyPosts = async () => {
    const postsRef = collection(firestore, "posts");
    const q = query(postsRef, where("creatorId", "==", `${user.uid}`), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach((x) => {console.log(x.data())})
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <>
      {auth.currentUser ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            signOut(auth);
            navigate("/", { replace: true });
          }}
        >
          Sign Out
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
