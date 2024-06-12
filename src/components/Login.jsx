import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import "../styles/styles-components/Login.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    authService
      .login(body)
      .then((response) => {
        // save token (response of login route) in local storage
        const token = response.data.authToken;
        console.log(token);
        localStorage.setItem("authToken", token);

        // check if token correct: verify route & local storage
        authenticateUser();
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        console.log(err);
      });
  };

  const errorMessageElement = (
    <>
      <h2 className="error-message">{errorMessage}</h2>
    </>
  );

  return (
    <div className="login-wrapper page-wrapper">
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="form"
      >
        <label htmlFor="" className="form-input-label">
          email
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
            className="form-input-input"
          />
        </label>
        <label htmlFor="" className="form-input-label">
          password
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
            className="form-input-input"
          />
        </label>
        {errorMessage && errorMessageElement}
        <button type="submit" className="form-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
