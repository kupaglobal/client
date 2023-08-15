import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          textTransform: "lowercase",
          ".Mui-selected": {
            color: "var(--primary-color)",
          },
          ".MuiTabs-indicator": {
            backgroundColor: "var(--primary-color)",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "inherit",
  },
});

export default theme;
