import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./Router";
import { firebaseApp, auth } from "./firebaseApp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

type FirebaseContextType = {
  uid?: string;
  displayName?: string;
}

export const FirebaseContext = React.createContext<FirebaseContextType>({});

function App() {
  const [init, setInit] = useState(false);
  const [context, setContext] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setContext({
          uid: u.uid,
          displayName: u.displayName
        })
      }
      setInit(true);
    });
  }, []);

  return (
    <FirebaseContext.Provider value={context}>
      <header></header>
      <main>{init ? <AppRouter /> : <p>Wait...</p>}</main>
      <footer></footer>
    </FirebaseContext.Provider>
  );
}

export default App;
