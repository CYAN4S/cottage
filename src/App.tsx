import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./Router";
import { firebaseApp, auth } from "./firebaseApp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import useProfile from "./Store";

type ContextType = {
  uid: string | null;
  displayName: string | null;
  setNewProfile: (newDisplayName: string | null) => Promise<void>;
} | null;

export const FirebaseContext = React.createContext<ContextType>(null);

function App() {
  const [init, setInit] = useState(false);
  const [context, setContext] = useState<ContextType>(null);

  const { displayName, uid, setNewProfile } = useProfile(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setContext({ ...u, setNewProfile });
      else setContext(null);

      setInit(true);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    setContext({ uid, displayName, setNewProfile });
  }, [displayName, uid]);

  return (
    <FirebaseContext.Provider value={context}>
      <header></header>
      <main>{init ? <AppRouter /> : <p>Wait...</p>}</main>
      <footer></footer>
    </FirebaseContext.Provider>
  );
}

export default App;
