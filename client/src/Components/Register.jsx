import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router";
import "../Pages/AuthPage/AuthPage.css";


const Register = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [image, setImage] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
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
    console.log(name, email, password, image);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      console.log("Axios Request:", {
        method: "POST",
        url: "/api/user",
        data: { name, email, password, image },
        config,
      });
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          image,
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
      setPicLoading(false);
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
      setPicLoading(false);
      console.log(error)
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "HowFa-ChatApp");
      data.append("cloud_name", "dj5yki98o");
      fetch(`https://api.cloudinary.com/v1_1/dj5yki98o/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };




  return (
    <div className="form-container sign-up">
          <form>
            <h2>sign up</h2>
            <div className="form-group">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <i className="fas fa-user"></i>
              <label htmlFor="">username</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="">email</label>
            </div>
            <div className="form-group">
              <input
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>
                <button onClick={handleClick} >
                  {show ? (
                    <BiHide style={{ fontSize: "20px" }} />
                  ) : (
                    <BiShow style={{ fontSize: "20px" }} />
                  )}
                </button>
              </span>
              <label htmlFor="">password</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
              <label htmlFor="">confirm password</label>
            </div>
            <div className="form-group">
              <input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              <label htmlFor="">Upload profile picture</label>
            </div>
            <Button
              className="btn"
              width="100%"
              style={{ marginTop: 15 }}
              onClick={submitHandler}
              isLoading={picLoading}
            >
              sign up
            </Button>
            <div className="link">
              <p>
                You already have an account?
                <a className="signin-link" onClick={props.handleSignUpClick}>
                  {" "}
                  sign in
                </a>
              </p>
            </div>
          </form>
        </div>
  )
}

export default Register