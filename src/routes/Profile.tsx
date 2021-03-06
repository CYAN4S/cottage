import React, { useContext } from "react";
import { auth, firestore } from "../firebaseApp";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { FirebaseContext } from "../App";
import Timeline from "../components/Timeline";

export default function Profile() {
  const navigate = useNavigate();
  const { displayName, uid, setNewDisplayName } = useContext(FirebaseContext)!;
  const [newDisplayName, setNewDN] = useState(displayName);

  const [posts, setPosts] = useState<any[]>([]);

  const getMyPosts = async () => {
    const postsRef = collection(firestore, "posts");

    const q = query(
      postsRef,
      where("creatorId", "==", `${uid}`),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    setPosts(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
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
    if (displayName !== newDisplayName) {
      await setNewDisplayName(newDisplayName);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div>
      <h2>닉네임 설정</h2>
      <form onSubmit={onSubmit}>
        <input
          id="displayname"
          type="text"
          placeholder="Display name"
          value={newDisplayName ? newDisplayName : ""}
          onChange={(e) => setNewDN(e.target.value)}
        />
        <input type="submit" value="프로필 갱신" />
      </form>
      <h2>로그아웃</h2>
      <button onClick={onSignOutClick}>Sign Out</button>
      <Timeline posts={posts} />
    </div>
  );
}
