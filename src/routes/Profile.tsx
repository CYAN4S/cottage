import React, { useContext } from "react";
import { auth, firestore } from "../firebaseApp";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { FirebaseContext } from "../App";

export default function Profile() {
  const navigate = useNavigate();

  const user = useContext(FirebaseContext);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);

  const getMyPosts = async () => {
    const postsRef = collection(firestore, "posts");

    const q = query(
      postsRef,
      where("creatorId", "==", `${user.uid}`),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    snapshot.forEach((x) => {
      console.log(x.data());
    });
  };

  const onSignOutClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut(auth);
    navigate("/", { replace: true });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser!, { displayName: newDisplayName });
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={(e) => {
            setNewDisplayName(e.target.value);
          }}
        />
        <input type="submit" value="프로필 갱신" />
      </form>
      <button onClick={onSignOutClick}>Sign Out</button>
    </>
  );
}
