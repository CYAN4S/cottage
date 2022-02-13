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
  const context = useContext(FirebaseContext);

  return (
    <Router>
      {context && <Navigation />}
      <Routes>
        <Route path="/" element={context ? <Home /> : <Auth />} />
        <Route
          path="/profile"
          element={context ? <Profile /> : <Navigate replace to="/" />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
