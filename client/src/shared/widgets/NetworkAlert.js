import { Alert, AlertTitle } from "@mui/material";

const NetworkAlert = () => {
  return (
    <Alert
      severity="error"
      sx={{
        width: "25%",
        position: "absolute",
        right: "1rem",
        bottom: "1rem",
        fontSize: "1.5rem",
      }}
    >
      <AlertTitle sx={{ fontSize: "2.5rem"}}>
        Network Error
      </AlertTitle>
      Reconnect to wifi
    </Alert>
  );
};

export default NetworkAlert;
