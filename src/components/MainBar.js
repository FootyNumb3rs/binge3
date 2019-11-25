import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MobileSearchBar from "./MobileSearchBar";
import { ThemeProvider } from "@material-ui/styles";
import SearchBar from "./SearchBar";
import Button from "@material-ui/core/Button";
import "../styles/app-bar.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import SideDrawer from "../components/SideDrawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#0d0d0d",
    padding: 0,
    display: "flex",
    //borderRadius: "10px",
    alignItems: "center",
    maxHeight: "48px"
  },

  button: {
    color: "gainsboro",
    fontSize: 12.5,
    fontWeight: 200,
    fontFamily: "Roboto",
    borderRadius: 23,
    textTransform: "None",
    margin: "0px 10px"
  },
  menuButton: { minHeight: 0, minWidth: 0 }
}));

export default function MainBar({ queryChange, searchSubmit, show }) {
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
      <div
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <MobileSearchBar
          queryChange={queryChange}
          searchSubmit={searchSubmit}
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
        e
        levation={0}
      >
        <Toolbar variant="dense" disableGutters className="toolbar">
          <SwipeableDrawer
            open={state.right}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            <SideDrawer />
          </SwipeableDrawer>

          {/* MOBILE DRAWER BUTTON */}
          <div className="mobile-menu-button">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              className={classes.menuButton}
              onClick={() => {
                toggleDrawer_();
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>

          {/* APP TITLE */}
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <div className={"title-div"}>
              <div
                className={"title"}
                //  noWrap
              >
                MOVX
              </div>
            </div>
          </Link>

          {/* MENU BUTTONS */}

          <div className={"buttonContainer"}>
            <Link to="/browse/tv" style={{ textDecoration: "none" }}>
              <Button className={classes.button} onClick={() => {}}>
                HOME
              </Button>
            </Link>
            <Link to="/browse/tv" style={{ textDecoration: "none" }}>
              <Button className={classes.button} onClick={() => {}}>
                SHOWS
              </Button>
            </Link>
            <Link to="/browse/movie" style={{ textDecoration: "none" }}>
              <Button className={classes.button} onClick={() => {}}>
                MOVIES
              </Button>
            </Link>
          </div>

          {/* SEARCH BAR */}
          <SearchBar queryChange={queryChange} searchSubmit={searchSubmit} />

          {/* MOBILE SEARCH BUTTON */}
          <div className="mobile-search-button">
            <IconButton color="inherit" aria-label="open drawer">
              <SearchIcon
                onClick={() => {
                  setBar(!openBar);
                }}
              />
            </IconButton>
          </div>
        </Toolbar>
        {openBar ? openSearch() : ""}
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
