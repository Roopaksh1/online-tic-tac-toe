import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { API_CLIENT } from "../shared/services/api_client";
import SignUp from "./SignUp";

const Login = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);

  const login = async () => {
    const result = await API_CLIENT.post(process.env.REACT_APP_LOGIN, {
      username,
      password,
    });
    if (result.data.flag) {
      if (result.data.flag === 1) {
        if (result.data.doc.password === password) {
          setMessage(`Welcome ${result.data.doc.firstname}`);
          setToken({ ...result.data.doc, token: true });
        } else {
          setMessage("Incorrect password.");
        }
      } else {
        setMessage("Database Error.");
      }
    } else {
      setMessage("Invalid Username.");
    }
  };

  const showSignUp = () => {
    setFlag(true);
  };

  return (
    <>
      {flag ? (
        <SignUp />
      ) : (
        <div className="login">
          <h2>Login</h2>
          <div className="field">
            <input
              type="text"
              id="username"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <label htmlFor="username">User Name</label>
          </div>
          <div className="field">
            <input
              type="password"
              id="pass-word"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label htmlFor="pass-word">Password</label>
          </div>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            color="success"
          >
            <Button sx={{ fontSize: "2rem" }} onClick={login} color="success">
              Login
            </Button>
            <Button sx={{ fontSize: "2rem" }} onClick={showSignUp} color="info">
              Sign Up
            </Button>
          </ButtonGroup>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Login;
