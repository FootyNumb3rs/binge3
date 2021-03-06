import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import MobileSearchBar from "./MobileSearchBar";
import { ThemeProvider } from "@material-ui/styles";
import "../styles/app-bar.css";
import SideDrawer from "../components/SideDrawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MobileToolbar from "../components/MobileToolbar.js";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#0d0d0d",
    padding: 0,
    display: "flex",
    //borderRadius: "10px",
    alignItems: "center",
    height: "100%",

    ["@media (min-width: 736px)"]: {
      visibility: "hidden",
      height: 0
    }
  },
  button: {
    color: "gainsboro",
    fontSize: 12.5,
    fontWeight: 200,
    fontFamily: "Arial",
    borderRadius: 23,
    textTransform: "None",
    margin: "0px 10px"
  },
  menuButton: { minHeight: 0, minWidth: 0 }
}));

export default function MobileMainBar({
  queryChange,
  searchSubmit,
  show,
  setPage,
  page,
  setBrowserState,
  browserState
}) {
  const classes = useStyles();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const [openBar, setBar] = useState(false);

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const toggleDrawer_ = () => {
    setState({ ...state, ["right"]: true });
  };

  const openSearch = () => {
    return (
      <div className="mobile-search-bar-container">
        <MobileSearchBar
          queryChange={queryChange}
          searchSubmit={searchSubmit}
          setBar={setBar}
          barOpen={openBar}
          setBrowserState={setBrowserState}
          browserState={browserState}
        />
      </div>
    );
  };

  return (
    <ThemeProvider>
      <AppBar
        position="sticky"
        className={classes.appBar}
        style={{ display: show ? "flex" : "none" }}
        elevation={0}
      >
        {openBar ? (
          openSearch()
        ) : (
          <MobileToolbar
            queryChange={queryChange}
            searchSubmit={searchSubmit}
            setBar={setBar}
            barOpen={openBar}
            setPage={setPage}
            page={page}
          />
        )}
      </AppBar>
    </ThemeProvider>
  );
}

{
  /*
<div>
  
<Typography
  style={{
    fontFamily: "Roboto",
    fontSize: 14,
    marginRight: 22,
    fontWeight: 100
  }}
  noWrap
>
  Made by{" "}
  <a
    href="https://www.linkedin.com/in/tande-mungwa"
    target="_blank"
  >
    <font color="white">Tande Mungwa</font>
  </a>{" "}
  with React.js & TMDb
</Typography>
</div>;
*/
}
