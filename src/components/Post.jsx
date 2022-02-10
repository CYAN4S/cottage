import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "firebaseApp";
import { useState } from "react";

export default function Post({ postDoc, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(postDoc.content);

  return (
    <div>
      <h4>{postDoc.content}</h4>
      {isOwner && (
        <>
          <button
            onClick={async () => {
              const ok = window.confirm("정말로 삭제하시겠습니까?");
              ok && (await deleteDoc(doc(firestore, "posts", postDoc.id)));
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setEditing((prev) => !prev);
            }}
          >
            Edit
          </button>

          {editing ? (
            <>
              <form
                onSubmit={async (e) => {
                    e.preventDefault()
                  await updateDoc(doc(firestore, "posts", postDoc.id), {
                    content: newContent,
                  });
                  setEditing(false)
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
