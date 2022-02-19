import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { FirebaseContext } from "../App";
import { firestore, storage } from "../firebaseApp";

import { ReactComponent as ImageIcon } from "../svg/image.svg";

import styles from "../styles/Editor.module.scss";

export default function Editor() {
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");

  const imageInputRef = useRef<any>(null);

  const context = useContext(FirebaseContext);

  const onSubmit = async () => {
    let attachmentUrl: string = "";

    if (!attachment && !content) {
      alert("내용을 입력하세요. 적어도 사진이라도 넣으세요.");
      return;
    }

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
    <form className={styles.editor}>
      <input
        type="text"
        placeholder="무슨 생각하시나요?"
        maxLength={140}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.input}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={imageInputRef}
        style={{ display: "none" }}
      />
      {attachment && (
        <div className={styles.imageManager}>
          <img src={attachment} className={styles.image} />
        </div>
      )}
      {attachment === "" ? (
        <button
          className={styles.imageUpload}
          onClick={() => imageInputRef.current.click()}
        >
          <ImageIcon />
        </button>
      ) : (
        <button onClick={() => setAttachment("")}>사진 삭제</button>
      )}

      <button className={styles.upload} onClick={onSubmit}>
        올리기
      </button>
    </form>
  );
}
