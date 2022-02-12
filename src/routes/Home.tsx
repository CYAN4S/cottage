import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { firestore, storage } from "../firebaseApp";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Post from "../components/Post";
import { FirebaseContext } from "../App";

export default function Home() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [attachment, setAttachment] = useState("");

  const user = useContext(FirebaseContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let attachmentUrl = null;

    if (attachment) {
      const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(firestore, "posts"), {
      content,
      createdAt: Date.now(),
      creatorId: user.uid,
      attachmentUrl,
    });

    setContent("");
    setAttachment("");
  };

  const getContents = async () => {
    const docs = await getDocs(collection(firestore, "posts"));
    docs.forEach((doc) => {
      console.log(doc.data().content);
      setPosts((prev) => [{ ...doc.data(), id: doc.id }, ...prev]);
    });
  };

  const onFileChange = (e: any) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      setAttachment(e.currentTarget?.result);
    };
    reader.readAsDataURL(file!);
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
          <Post key={c.id} postDoc={c} isOwner={c.creatorId === user.uid} />
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨 생각하시나요?"
          maxLength={140}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Up!" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={() => setAttachment("")}>Clear</button>
          </div>
        )}
      </form>
    </div>
  );
}
