import { useState, useEffect } from "react";
import { firestore } from "../firebaseApp";
import { collection, onSnapshot } from "firebase/firestore";

import Editor from "../components/Editor";
import Timeline from "../components/Timeline";

import styles from "../styles/Home.module.scss"

type PostData = {
  id: string,
  createdAt: number,
  attachmentUrl: string | null
  creatorId: string,
  content: string
}

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })).sort((a: any, b: any) => - a.createdAt + b.createdAt)
      );
    });
    return () => unsub();
  }, []);

  return (
    <div className={styles.home}>
      <Editor />
      <Timeline posts={posts}/>
    </div>
  );
}
