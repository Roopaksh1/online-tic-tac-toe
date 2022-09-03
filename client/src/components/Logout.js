const Logout = ({ setToken }) => {
  const logout = () => {
    setToken(false);
  };
  return (
    <button className="logout" onClick={logout}>
      Log out
    </button>
  );
};

export default Logout;
