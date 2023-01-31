import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Cancel = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong! — <strong>Please try again</strong>
      </Alert>
    </Box>
  );
};

export default Cancel;
