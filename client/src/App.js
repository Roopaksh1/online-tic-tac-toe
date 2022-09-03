import "./App.css";
import Logout from "./components/Logout";
import useToken from "./hooks/useToken";
import LoginScreen from "./pages/LoginScreen";

function App() {
  const [token, setToken] = useToken();
  console.log(token);
  if (token) {
    return (
      <>
        <Logout setToken={setToken}/>
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
