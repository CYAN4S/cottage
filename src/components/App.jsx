import "./App.css";
import AppRouter from "components/Router";
import { useState, useEffect } from "react";
import { firebaseApp, auth } from "firebaseApp";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInit(true);
    });
  }, []);

  return (
    <>
      <header></header>
      <main>
        {init ? <AppRouter isLoggedIn={user} /> : <p>Wait...</p>}
      </main>

      <footer>
        {auth.currentUser ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut(auth);
            }}
          >
            Sign Out
          </button>
        ) : (
          <></>
        )}
      </footer>
    </>
  );
}

export default App;
