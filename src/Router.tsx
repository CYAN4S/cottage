import React, { useContext } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Navigation from "./components/Navigation";
import { FirebaseContext } from "./App";
import styles from "./styles/Router.module.scss";

const AppRouter = () => {
  const context = useContext(FirebaseContext);

  return (
    <>
      <Router>
        
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <Navigation />
          </header>
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={context ? <Home /> : <Auth />} />
              <Route
                path="/profile"
                element={context ? <Profile /> : <Navigate replace to="/" />}
              />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </main>
          <footer></footer>
        </div>
      </Router>
    </>
  );
};

export default AppRouter;
