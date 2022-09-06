import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { API_CLIENT } from "../shared/services/api_client";
import Login from "./Login";

const SignUp = ({ setToken }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);

  const signUp = async () => {
    const res = await API_CLIENT.post(process.env.REACT_APP_LOGIN, user);
    const alreadyRegistered = res.data;
    if (alreadyRegistered.flag) {
      if (alreadyRegistered.flag === 1) {
        setMessage("That username is already taken.");
      } else {
        setMessage("Database Error.");
      }
    } else {
      const result = await API_CLIENT.post(process.env.REACT_APP_SIGNUP, user);
      setMessage(result.data.message);
      if (result.data.message === "Registered.") {
        setToken({ ...user, token: true });
      }
    }
  };

  const showLogin = () => {
    setFlag(true);
  };

  return (
    <>
      {flag ? (
        <Login />
      ) : (
        <div className="signup">
          <h2>Sign Up</h2>
          <div className="field">
            <input
              type="text"
              id="first-name"
              placeholder="First Name"
              onChange={(e) => {
                setUser({ ...user, firstname: e.target.value });
              }}
            ></input>
            <label htmlFor="first-name">First Name</label>
          </div>
          <div className="field">
            <input
              type="text"
              id="last-name"
              placeholder="Last Name"
              onChange={(e) => {
                setUser({ ...user, lastname: e.target.value });
              }}
            ></input>
            <label htmlFor="last-name">Last Name</label>
          </div>
          <div className="field">
            <input
              type="text"
              id="user-name"
              placeholder="User Name"
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            ></input>
            <label htmlFor="user-name">User Name</label>
          </div>
          <div className="field">
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            ></input>
            <label htmlFor="password">Password</label>
          </div>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            color="success"
          >
            <Button
              sx={{ fontSize: "2rem" }}
              variant="contained"
              color="success"
              onClick={signUp}
            >
              Sign Up
            </Button>
            <Button sx={{ fontSize: "2rem" }} onClick={showLogin} color="info">
              Login
            </Button>
          </ButtonGroup>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default SignUp;
