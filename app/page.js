"use client";

import { useEffect, useState } from "react";
import Products from "../component/products";
import "./page.css";
import Link from "next/link";
export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userNameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword((prevValue) => {
      return event.target.value;
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log("the response is :", data);
    setEmail(data.email);

    if (response.ok) {
      setEmail(data.email);
      setName(data.firstName);
      setAuthenticated(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      console.log("something went wrong");
      setErrorMessage(data.message);
    }
  };
  // dealiing with the local storage
  // const [validUser, setValidUser] = useState("");
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setValidUser(localStorage.getItem("isLoggedIn"));
  //   }
  // }, []);
  // dealiing with the local storage
  return (
    <div className="container">
      {!authenticated && (
        <form onSubmit={submitHandler} className="loginForm">
          <div>
            <h1 className="title">Welcome</h1>
            <div className="formGroup">
              <label className="label">Username</label>
              <br />
              <input type="text" onChange={userNameHandler} value={username} />
            </div>
            <div>
              <div className="formGroup">
                <label>Password</label>
                <br />
                <input
                  type="password"
                  onChange={passwordHandler}
                  value={password}
                  className="input"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submitButton">
            Login
          </button>
          <br />
          {errorMessage && (
            <>
              <h4 style={{ color: "red" }}>{errorMessage}</h4>
              <Link href="/instruction">Click here for Login credentials</Link>
              <br />
              <Link href="https://github.com/P-Juli/one-last-try">
                Github Repository{" "}
              </Link>
            </>
          )}
        </form>
      )}
      {authenticated && <Products email={email} name={name} />}
    </div>
  );
}
