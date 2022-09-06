import { Button } from "@mui/material";

const Logout = ({ setToken }) => {
  const logout = () => {
    setToken(false);
  };
  return (
    <Button
      sx={{
        fontSize: "1.5rem",
        padding: "1rem",
        position: "absolute",
        top: "1rem",
        left: "1rem",
      }}
      variant="contained"
      onClick={logout}
    >
      Log out
    </Button>
  );
};

export default Logout;
