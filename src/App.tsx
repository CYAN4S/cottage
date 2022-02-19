import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { auth } from "./firebaseApp";
import { onAuthStateChanged } from "firebase/auth";
import useProfile from "./Store";

type ContextType = {
  uid: string | null;
  displayName: string | null;
  setNewDisplayName: (newDisplayName: string | null) => Promise<void>;
} | null;

export const FirebaseContext = React.createContext<ContextType>(null);

function App() {
  const [init, setInit] = useState(false);
  const [context, setContext] = useState<ContextType>(null);

  const { displayName, uid, setNewDisplayName } = useProfile(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setContext({ ...u, setNewDisplayName });
      else setContext(null);

      setInit(true);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    setContext({ uid, displayName, setNewDisplayName });
  }, [displayName, uid]);

  return (
    <FirebaseContext.Provider value={context}>
      {init ? <AppRouter /> : <p>Wait...</p>}
    </FirebaseContext.Provider>
  );
}

export default App;
