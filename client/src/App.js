import "./App.css";
import useToken from "./hooks/useToken";
import LoginScreen from "./pages/LoginScreen";
import { io } from "socket.io-client";
import NetworkAlert from "./shared/widgets/NetworkAlert";
import { useState } from "react";
import Home from "./pages/Home";
const socket = io(process.env.REACT_APP_SERVER);

function App() {
  const [token, setToken] = useToken();
  const [alert, setAlert] = useState(false);

  socket.on("connect", () => setAlert(false));

  socket.on("connect_error", () => setAlert(true));

  socket.on("disconnect", () => setAlert(true));

  return (
    <>
      {token ? (
        <>
          <Home setToken={setToken} socket={socket}/>
          {alert && <NetworkAlert />}
        </>
      ) : (
        <>
          <LoginScreen setToken={setToken} />
          {alert && <NetworkAlert />}
        </>
      )}
    </>
  );
}

export default App;
