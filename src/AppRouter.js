import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import routes from "pages/routes";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar routes={routes} />
        <Switch>
          {routes.map(({ path, component }, index) => {
            return <Route exact path={path} component={component} key={index} />;
          })}
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
