import { useEffect } from "react";
import "./App.css";
import useToken from "./hooks/useToken";
import GameScreen from "./pages/GameScreen";
import LoginScreen from "./pages/LoginScreen";

function App() {

  const [token, setToken] = useToken();
  if (token) {
    return <GameScreen setToken={setToken} />;
  } else {
    return (
      <>
        <LoginScreen setToken={setToken} />
      </>
    );
  }
}

export default App;
