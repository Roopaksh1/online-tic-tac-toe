import "../assets/styles/loginScreen.css";
import Login from "../components/Login";

const LoginScreen = ({ setToken }) => {
  return (
    <>
      <h1>TIC TAC TOE</h1>
      <Login setToken={setToken} />
    </>
  );
};

export default LoginScreen;
