import { onAuthStateChanged, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { firebaseApp, auth, firestore, storage } from "./firebaseApp";

export default function useProfile() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setDisplayName(u.displayName);
        setUid(u.uid);
      }
    });
  }, []);

  useEffect(() => {
    console.log(`${displayName} changed.`);
  }, [displayName])
  

  const setNewProfile = async (newDisplayName: string | null) => {
    const user = auth.currentUser!
    await updateProfile(user, { displayName: newDisplayName })
    setDisplayName(user.displayName)
  };

  return { displayName, uid, setNewProfile };
}
