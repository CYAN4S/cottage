import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../App";

export default function Navigation() {
  const user = useContext(FirebaseContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{user.displayName}의 프로필</Link>
        </li>
      </ul>
    </nav>
  );
}
