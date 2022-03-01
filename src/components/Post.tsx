import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../firebaseApp";
import { useState } from "react";
import styles from "../styles/Post.module.scss";
import editorStyles from "../styles/Editor.module.scss";

import { ReactComponent as DeleteIcon } from "../svg/delete.svg";
import { ReactComponent as EditIcon } from "../svg/edit.svg";

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
          <img src={postDoc.attachmentUrl} className={styles.image} alt="Uploaded."/>
        </div>
      )}

      <div className={styles.postmeta}>
        <p className={styles.date}>
          {new Date(postDoc.createdAt).toLocaleString("ko-KR", {
            timeZone: "UTC",
          })}
        </p>
        {isOwner && (
          <div className={styles.smallicons}>
            <button onClick={onDeleteClick}>
              <DeleteIcon />
            </button>
            <button onClick={() => setEditing((p) => !p)}>
              <EditIcon />
            </button>
          </div>
        )}
      </div>

      {isOwner && (
        <>
          {editing ? (
            <>
              <form className={editorStyles.editor}>
                <input
                  className={editorStyles.input}
                  type="text"
                  placeholder="수정된 내용을 넣어주세요."
                  value={newContent}
                  onChange={(e) => {
                    setNewContent(e.target.value);
                  }}
                />
                <button
                  className={editorStyles.cancel}
                  onClick={() => {
                    setEditing((prev) => !prev);
                  }}
                >
                  취소
                </button>
                <button
                  className={editorStyles.upload}
                  onClick={async () => {
                    await updateDoc(doc(firestore, "posts", postDoc.id), {
                      content: newContent,
                    });
                    setEditing(false);
                  }}
                >
                  수정
                </button>
              </form>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
