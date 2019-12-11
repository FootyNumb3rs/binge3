import React, { useState, useRef } from "react";
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
    transitionProperty: "all",
    transitionDuration: ".2s",
    transitionTimingFunction: "ease",

    ["@media (max-width: 736px)"]: {
      visibility: "hidden",
      height: 0
    },

    //zIndex: theme.zIndex.drawer + 1,
    background: "transparent",
    padding: 0,
    display: "flex",
    //borderRadius: "10px",
    alignItems: "center"
    //height: "100%" -- Set if position = 'sticky'
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

export default function MainBar({
  queryChange,
  searchSubmit,
  show,
  setPage,
  page
}) {
  const classes = useStyles();

  const navigation = useRef(null);

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
        />
      </div>
    );
  };

  window.addEventListener("scroll", () => {
    if (window.pageYOffset === 0) {
      navigation.current.style.background = "transparent";
      navigation.current.style.boxShadow = "none";
    } else {
      navigation.current.style.background = "#0d0d0d";
      //navigation.current.style.boxShadow = "0 8px 20px rgba(0,0,0,.1)";
    }
  });

  return (
    <ThemeProvider>
      <AppBar
        position="fixed"
        className={classes.appBar}
        ref={navigation}
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
