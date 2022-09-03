const Logout = ({ setToken }) => {
  const logout = () => {
    setToken(false);
  }
  return <button onClick={logout}>Log out</button>;
};

export default Logout;
