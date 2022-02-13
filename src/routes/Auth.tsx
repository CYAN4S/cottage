import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseApp";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSignClick = (action: "UP" | "IN") => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      try {
        const credentials =
          action === "UP"
            ? await createUserWithEmailAndPassword(auth, email, password)
            : await signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      }
    };
  };

  const onSocialClick =
    (provider: "google" | "github") =>
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const authProvider =
        provider === `google`
          ? new GoogleAuthProvider()
          : new GoogleAuthProvider();
      const res = await signInWithPopup(auth, authProvider);
    };

  return (
    <div>
      <form>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSignClick("IN")}>Sign In</button>
        <button onClick={onSignClick("UP")}>Sign Up</button>
        <button name="google" onClick={onSocialClick("google")}>
          Sign In with Google
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Auth;
