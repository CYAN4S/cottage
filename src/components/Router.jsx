import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import EditProfile from "routes/EditProfile";
import Profile from "routes/Profile";
import { useState } from "react";
import Navigation from "components/Navigation";

const AppRouter = ({ user }) => {
  return (
    <Router>
      {user && <Navigation />}
      <Routes>
        {user ? (
          <>
            <Route exact path="/" element={<Home user={user}/>} />
            <Route exact path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
            {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
