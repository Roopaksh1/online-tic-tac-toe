import { useState } from "react";
import { API_CLIENT } from "../shared/services/api_client";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const login = async () => {
    const result = await API_CLIENT.post(process.env.REACT_APP_LOGIN, {
      username,
      password,
    });
    if (result.data.flag) {
      if (result.data.flag === 1) {
        if (result.data.doc.password === password) {
          setMessage(`Welcome ${result.data.doc.firstname}`);
        } else {
          setMessage("Incorrect password.")
        }
      } else {
        setMessage("Database Error.");
      }
    } else {
      setMessage("Invalid Username.");
    }
  };

  return (
    <>
      <div className="login">
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
        <button onClick={login}>Login</button>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Login;
