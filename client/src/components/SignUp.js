import { useState } from "react";
import { API_CLIENT } from "../shared/services/api_client";

const SignUp = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
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
    }
  };

  return (
    <>
      <div className="signup">
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
        <button onClick={signUp}>SignUp</button>
        <p>{message}</p>
      </div>
    </>
  );
};

export default SignUp;
