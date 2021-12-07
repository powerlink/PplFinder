import React from "react";
import { createTheme, ThemeProvider as Provider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const ThemeProvider = ({ children }) => {
  const overrides = {
    MuiTab: {
      root: {
        backgroundColor: "#303030",
      },
    },
  };
  const theme = React.useMemo(
    () =>
      createTheme({
        overrides,
        palette: {
          type: "dark",
          primary: {
            main: "#84ffff",
          },
          error: {
            main: "#f06292",
          },
        },
      }),
    []
  );

  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};

export default ThemeProvider;
