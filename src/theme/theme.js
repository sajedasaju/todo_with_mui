import { createTheme } from "@mui/material";
import { green, red, teal } from "@mui/material/colors";

export const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      parent: teal[100],
      main: teal[50],
      darker: "#053e85",
      success:green[500]
    },
    secondary: {
      main: red[100],
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});
