import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../App";
import useProfile from "../Store";

export default function Navigation() {
  const { displayName } = useContext(FirebaseContext)!;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{displayName}의 프로필</Link>
        </li>
      </ul>
    </nav>
  );
}
