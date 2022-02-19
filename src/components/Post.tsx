import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebaseApp";
import React from "react";
import { useState } from "react";
import styles from "../styles/Post.module.scss";

export default function Post({ postDoc, isOwner }: any) {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(postDoc.content);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(firestore, "posts", postDoc.id));
      postDoc.attachmentUrl &&
        (await deleteObject(ref(storage, postDoc.attachmentUrl)));
    }
  };

  return (
    <div className={styles.post}>
      <p className={styles.content}>{postDoc.content}</p>
      {postDoc.attachmentUrl && (
        <div className={styles.imageContainer}>
          <img src={postDoc.attachmentUrl} className={styles.image} />
        </div>
      )}
      <p className={styles.date}>{new Date(postDoc.createdAt).toLocaleString('ko-KR', { timeZone: 'UTC' })}</p>

      <div className={styles.postProfile}>
        
      </div>

      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button onClick={() => setEditing((p) => !p)}>Edit</button>

          {editing ? (
            <>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await updateDoc(doc(firestore, "posts", postDoc.id), {
                    content: newContent,
                  });
                  setEditing(false);
                }}
              >
                <input
                  type="text"
                  placeholder="수정된 내용을 넣어주세요."
                  value={newContent}
                  onChange={(e) => {
                    setNewContent(e.target.value);
                  }}
                />
                <input type="submit" value="수정" />
              </form>
              <button
                onClick={() => {
                  setEditing((prev) => !prev);
                }}
              >
                취소
              </button>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
