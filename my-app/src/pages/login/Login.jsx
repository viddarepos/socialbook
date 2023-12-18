import React, { useRef } from "react"; //useRef se koristi da prikupis podake iz inputa
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handlerClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    console.log(user);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDescription">
            Connect with friends and the world around you on Facebook
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handlerClick}>
            <input
              type="email"
              placeholder="Email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              minLength={6}
              required
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <div className="loginRegisterButton">
              <Link to="/register">
                <button className="loginRegisterButton">
                  {isFetching ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
