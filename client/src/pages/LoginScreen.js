const { default: Login } = require("../components/Login");
const { default: SignUp } = require("../components/SignUp");

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