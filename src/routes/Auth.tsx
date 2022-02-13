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
      } catch (error: any) {
        setError(error.message);
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
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSignClick("IN")}>Sign In</button>
        <button onClick={onSignClick("UP")}>Sign Up</button>

        <button onClick={onSocialClick("google")}>Sign In with Google</button>
      </form>

      <p>{error}</p>
    </div>
  );
};

export default Auth;
