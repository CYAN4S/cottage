import React from "react";
import { auth } from "firebaseApp";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let navigate = useNavigate();

  return (
    <>
      {auth.currentUser ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            signOut(auth);
            navigate("/", { replace: true });
          }}
        >
          Sign Out
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
