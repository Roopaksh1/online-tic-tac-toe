const { default: Login } = require("../components/Login");
const { default: SignUp } = require("../components/SignUp");

const LoginScreen = () => {
  return (
    <>
      <h1>TIC TAC TOE</h1>
      <Login/>
      <SignUp/>
    </>
  );
}

export default LoginScreen;