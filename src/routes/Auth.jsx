import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";
import { auth } from "firebaseApp";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSignClick = (action) => {
    return async (e) => {
      e.preventDefault();
      try {
        const credentials =
          action === "UP"
            ? await createUserWithEmailAndPassword(auth, email, password)
            : await signInWithEmailAndPassword(auth, email, password);
        console.log(credentials);
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    };
  };

  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;

    const provider = name === `google` ? new GoogleAuthProvider() : null;

    await signInWithRedirect(auth, provider);
    getRedirectResult(auth).then((result) => {
      
    })
  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSignClick("IN")}>Sign In</button>
        <button onClick={onSignClick("UP")}>Sign Up</button>
        <button name="google">Sign In with Google</button>
        <button name="twitter">Sign In with Twitter</button>
        <button name="github">Sign In with GitHub</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Auth;
