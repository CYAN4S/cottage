import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { FirebaseContext } from "../App";
import { firestore, storage } from "../firebaseApp";

export default function Editor() {
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");

  const context = useContext(FirebaseContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let attachmentUrl: string = "";

    if (!attachment && !content)
      alert("내용을 입력하세요. 적어도 사진이라도 넣으세요.");

    if (attachment) {
      const storageRef = ref(storage, `${context?.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(firestore, "posts"), {
      content,
      createdAt: Date.now(),
      creatorId: context?.uid,
      attachmentUrl,
    });

    setContent("");
    setAttachment("");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = (e: any) => setAttachment(e.currentTarget?.result);
    reader.readAsDataURL(file);
  };

  return (
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
  );
}
