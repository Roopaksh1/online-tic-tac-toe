import "./App.css";
import useToken from "./hooks/useToken";
import GameScreen from "./pages/GameScreen";
import LoginScreen from "./pages/LoginScreen";
import { io } from "socket.io-client";
const socket = io("http://localhost:1234");

function App() {

  const [token, setToken] = useToken();
  if (token) {
    return <GameScreen setToken={setToken} socket={socket} />;
  } else {
    return (
      <>
        <LoginScreen setToken={setToken} />
      </>
    );
  }
}

export default App;
