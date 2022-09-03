import "../assets/styles/loginScreen.css";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const LoginScreen = ({ setToken }) => {
  return (
    <>
      <h1>TIC TAC TOE</h1>
      <Login setToken={ setToken }/>
      <SignUp setToken={ setToken }/>
    </>
  );
}

export default LoginScreen;