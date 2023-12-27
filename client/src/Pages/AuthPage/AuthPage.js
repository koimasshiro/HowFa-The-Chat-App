import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import {useNavigate} from 'react-router';
import {useToast} from '@chakra-ui/react';
import "./AuthPage.css";

const AuthPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  
  const navigate = useNavigate();
  const toast = useToast();

  //Swap between login and signup UI design
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignUpClick = () => {
    setIsSignIn(false);
  };

  const handleSignInClick = () => {
    setIsSignIn(true);
  };

  const submitHandler = async () => {

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <div className="authContainer">
      <div
        className={`wrapper ${
          isSignIn ? "animated-signin" : "animated-signup"
        }`}
      >
        <div className="form-container sign-up">
          <form action="#">
            <h2>sign up</h2>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <i className="fas fa-user"></i>
              <label for="">username</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label for="">email</label>
            </div>
            <div className="form-group">
              <input
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>
                <button onClick={handleClick}>
                  {show ? (
                    <BiHide style={{ fontSize: "20px" }} />
                  ) : (
                    <BiShow style={{ fontSize: "20px" }} />
                  )}
                </button>
              </span>
              <label for="">password</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
              <label for="">confirm password</label>
            </div>
            <button
              type="submit"
              className="btn"
              onClick={submitHandler}
            >
              sign up
            </button>
            <div className="link">
              <p>
                You already have an account?
                <a className="signin-link" onClick={handleSignUpClick}>
                  {" "}
                  sign in
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="form-container sign-in">
          <form action="#">
            <h2>login</h2>
            <div className="form-group">
              <input type="text" required />
              <i className="fas fa-user"></i>
              <label for="">username</label>
            </div>
            <div className="form-group">
              <input type={show ? "text" : "password"} required />
              <span>
                <button onClick={handleClick}>
                  {show ? (
                    <BiHide style={{ fontSize: "20px" }} />
                  ) : (
                    <BiShow style={{ fontSize: "20px" }} />
                  )}
                </button>
              </span>
              <label for="">password</label>
            </div>
            <div className="forgot-pass">
              <a href="">forgot password?</a>
            </div>
            <button type="submit" className="btn">
              login
            </button>
            <div className="link">
              <p>
                Don't have an account?
                <a className="signup-link" onClick={handleSignInClick}>
                  {" "}
                  sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
