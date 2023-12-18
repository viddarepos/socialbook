import React, { useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstace } from "../../config";
import "./register.css";
function Register() {
  //api call
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const { isFetching } = useContext(AuthContext);

  //metoda ispod radi registraciju i salje podatke u bazu
  const handlerClicker = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords dont match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstace.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
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
          <form className="loginBox" onSubmit={handlerClicker}>
            <input
              placeholder="Username"
              className="loginInput"
              required
              ref={username}
            />
            <input
              placeholder="Email"
              className="loginInput"
              ref={email}
              type="email"
            />
            <input
              placeholder="Password"
              className="loginInput"
              required
              ref={password}
              type="password"
              minLength={6}
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              required
              ref={passwordAgain}
              type="password"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>

              Sign Up
            </button>
            <div className="loginRegisterButton">
              <Link to="/login">
                <button className="loginRegisterButton">
                  Log into Account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
