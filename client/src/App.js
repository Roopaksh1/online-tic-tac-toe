import "./App.css";
import useToken from "./hooks/useToken";
import LoginScreen from "./pages/LoginScreen";

function App() {
  const [token, setToken] = useToken(false);
  if (token) {
    return (
      <>
        <h1>YO</h1>
      </>
    );
  } else {
    return (
      <>
        <LoginScreen setToken={setToken}/>
      </>
    );
  }
}

export default App;
