import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router";

const NavBar = ({ routes }) => {
  let history = useHistory();
  const [value, setValue] = useState(
    routes.findIndex(({ path }) => {
      return path == history.location.pathname;
    })
  );

  const handleChange = (_e, newValue) => {
    setValue(newValue);
    history.push(routes[newValue].path);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        {routes.map(({ label }, index) => {
          return <Tab label={label} index={index} key={index} />;
        })}
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
