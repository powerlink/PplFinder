import React, {useEffect, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const history = useHistory()

  useEffect(() => {
    history.push("/")
  }, []);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
    if(newValue){
        history.push("/favorites")
    }
    else{
        history.push("/")
    }
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
        <Tab label="Home" index={0} />
        <Tab label="Favorites" index={1}/>
      </Tabs>

    </AppBar>

  );
};

export default NavBar;