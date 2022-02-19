import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../App";
import useProfile from "../Store";

import styles from "../styles/Router.module.scss";

export default function Navigation() {
  const { displayName } = useContext(FirebaseContext)!;

  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/profile">{displayName}의 프로필</Link>
    </nav>
  );
}
