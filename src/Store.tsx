import { Auth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useProfile(auth: Auth) {
  // Properties from UserInfo interface
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [uid, setUid] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setDisplayName(u.displayName);
        setUid(u.uid);
        setPhotoUrl(u.photoURL);
        setEmail(u.email);
      }
    });
  }, []);

  const setNewDisplayName = async (newDisplayName: string | null) => {
    const user = auth.currentUser!
    await updateProfile(user, { displayName: newDisplayName })
    setDisplayName(user.displayName)
  };

  return { displayName, uid, photoUrl, email, setNewDisplayName };
}
