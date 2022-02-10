import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "firebaseApp";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import Post from "components/Post";

export default function Home({ user }) {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(firestore, "posts"), {
      content,
      createdAt: Date.now(),
      creatorId: user.uid,
    });
    setContent("");
  };

  const getContents = async () => {
    const docs = await getDocs(collection(firestore, "posts"));
    docs.forEach((doc) => {
      console.log(doc.data().content);
      setPosts((prev) => [{ ...doc.data(), id: doc.id }, ...prev]);
    });
  };

  useEffect(() => {
    getContents();
    const unsub = onSnapshot(collection(firestore, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <div>
        {posts.map((c) => (
          <Post key={c.id} postDoc={c} isOwner={c.creatorId === user.uid}/>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨 생각하시나요?"
          maxLength={140}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input type="submit" value="Up!" />
      </form>
    </div>
  );
}
