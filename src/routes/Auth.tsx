import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseApp";
import styles from "../styles/Auth.module.scss";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const onSignClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      isSignIn
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onSocialClick =
    (provider: "google" | "github") =>
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const authProvider =
        provider === `google`
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();

      await signInWithPopup(auth, authProvider);
    };

  return (
    <div>
      <h1>{isSignIn ? "코티지에 로그인" : "코티지에 가입"}</h1>
      <form>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSignClick}>{isSignIn ? "로그인" : "가입"}</button>
        <p>또는</p>
        <button onClick={onSocialClick("google")}>Google 계정으로 로그인</button>
        <button onClick={onSocialClick("google")}>GitHub 계정으로 로그인</button>
      </form>

      <p>
        {isSignIn ? "계정이 없으신가요? " : "이미 회원이신가요? "}
        <a onClick={() => setIsSignIn((p) => !p)} className={styles.link}>
          {isSignIn ? "가입하기" : "로그인하기"}
        </a>
      </p>

      <p>{error}</p>
    </div>
  );
};

export default Auth;
