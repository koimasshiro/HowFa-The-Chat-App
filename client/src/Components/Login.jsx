import React, { useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/toast";
import "../Pages/AuthPage/AuthPage.css";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // console.log( email, password );
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      console.log("Axios Request:", {
        method: "POST",
        url: "/api/user/login",
        data: { email, password },
        config,
      });
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="form-container sign-in">
      <form>
        <h2>Login</h2>
        <div className="form-group">
          <input type="text" onChange={(e) => setEmail(e.target.value)} required />
          <i className="fas fa-user"></i>
          <label htmlFor="">username</label>
        </div>
        <div className="form-group">
          <input type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} required />
          <span>
            <button onClick={handleClick}>
              {show ? (
                <BiHide style={{ fontSize: "20px" }} />
              ) : (
                <BiShow style={{ fontSize: "20px" }} />
              )}
            </button>
          </span>
          <label htmlFor="">password</label>
        </div>
        <div className="forgot-pass">
          <a href="">forgot password?</a>
        </div>
        <Button
          className="btn"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          login
        </Button>
        <div className="link">
          <p>
            Don't have an account?
            <a className="signup-link" onClick={props.handleSignInClick}>
              {" "}
              sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
