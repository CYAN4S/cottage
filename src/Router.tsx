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
import { useState } from "react";
import Navigation from "./components/Navigation";
import { FirebaseContext } from "./App";

const AppRouter = () => {
  const user = useContext(FirebaseContext);

  return (
    <Router>
      {user && <Navigation />}
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
