import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { API_CLIENT } from "../../../shared/services/api_client";
const Login = () => {
  const uid = useRef("");
  const pwd = useRef("");
  const [message, setMessage] = useState("Login");
  const doLogin = async () => {
    const result = await API_CLIENT.post(process.env.REACT_APP_LOGIN, {
      username: uid.current.value,
      password: pwd.current.value,
    });
    setMessage(result.data.message);
  };
  const doRegister = async () => {
    const result = await API_CLIENT.post(process.env.REACT_APP_REGISTER, {
      username: uid.current.value,
      password: pwd.current.value,
    });
    setMessage(result.data.message);
  };

  if (message.startsWith("Welcome")) {
    
  } else {
    return (
      <>
        <div className="wrapper">
          <h2>{message}</h2>
          <div className="form">
            <TextField
              sx={{ mr: 5, backgroundColor: "#f6fff8" }}
              InputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              inputRef={uid}
              id="outlined-basic"
              label="Userid"
              variant="outlined"
            />
            <TextField
              sx={{ backgroundColor: "#f6fff8" }}
              InputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              inputRef={pwd}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <br />
            <Button
              onClick={doLogin}
              variant="contained"
              sx={{
                mt: 5,
                mr: 5,
                fontSize: "1.5rem",
              }}
            >
              Login
            </Button>
            <Button
              onClick={doRegister}
              variant="contained"
              sx={{
                mt: 5,
                fontSize: "1.5rem",
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </>
    );
  }
};

export default Login;
