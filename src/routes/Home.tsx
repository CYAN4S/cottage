import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { firestore, storage } from "../firebaseApp";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

import Post from "../components/Post";
import { FirebaseContext } from "../App";
import Editor from "../components/Editor";
import Timeline from "../components/Timeline";

export default function Home() {

  const [posts, setPosts] = useState<any[]>([]);

  const context = useContext(FirebaseContext);


  // const getContents = async () => {
  //   const docs = await getDocs(collection(firestore, "posts"));
  //   docs.forEach((doc) => {
  //     setPosts((prev) => [{ ...doc.data(), id: doc.id }, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getContents();
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
      <Timeline posts={posts}/>
      <Editor />
    </div>
  );
}
