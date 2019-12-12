import React, { useState, PureComponent } from "react";
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
//import SideDrawer from "../components/SideDrawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import StarIcon from "@material-ui/icons/Star";
import SideDrawer from "../components/SideDrawer";
import MenuButton from "../components/MenuButton";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#171717",
    padding: 0,
    display: "flex",
    //flexGrow: 1,
    alignItems: "center",
    height: "100%"
  },

  button: {
    display: "flex",
    alignItems: "center",
    color: "#9e9e9e",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "Inter",
    borderRadius: 23,
    flexGrow: 1,
    textTransform: "None"
    //margin: "0px 10px"
  },
  menuButton: { minHeight: 0, minWidth: 0 }
}));

export default function MobileToolbar({
  queryChange,
  searchSubmit,
  setBar,
  barOpen,
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

  return (
    <Toolbar variant="dense" disableGutters className="toolbar">
      {/* APP TITLE */}
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <div className={"title-div"}>
          <div
            className={"app-title"}
            //  noWrap
          >
            FLIX
          </div>
        </div>
      </Link>

      {/* MENU BUTTONS */}
      <div className={"buttonContainer"}>
        <MenuButton label="Home" route="" page={page} setPage={setPage} />
        <MenuButton
          label="Movies"
          route="movie"
          page={page}
          setPage={setPage}
        />

        <MenuButton label="Shows" route="tv" page={page} setPage={setPage} />
      </div>

      {/* SEARCH BAR */}
      <SearchBar
        queryChange={queryChange}
        searchSubmit={searchSubmit}
        setBrowserState={setBrowserState}
        browserState={browserState}
      />

      {/* MOBILE SEARCH BUTTON */}
      <div className="mobile-search-button">
        <IconButton color="inherit" aria-label="open drawer">
          <SearchIcon
            onClick={() => {
              setBar(!barOpen);
            }}
          />
        </IconButton>
      </div>
    </Toolbar>
  );
}

{
  /*
      <SwipeableDrawer
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <SideDrawer />
      </SwipeableDrawer>
      

       MOBILE DRAWER BUTTON 
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
    */
}

{
  /*
 
        <div
          style={{ textDecoration: "none", height: "100%", margin: "0px 15px" }}
        >
          {<Button className={classes.button}>Home</Button>}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100%",
              justifyContent: "flex-end"
            }}
          >
            <div
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              <Link to="/browse/tv" style={{ textDecoration: "none" }}>
                <div className={classes.button} style={{ color: "white" }}>
                  Home
                </div>
              </Link>
            </div>
            <div style={{ height: "2px", backgroundColor: "#42a5f5" }} />
          </div>
        </div>


        <Link to="/browse/tv" style={{ textDecoration: "none" }}>
          <Button className={classes.button}>Shows</Button>
        </Link>
        <Link to="/browse/movie" style={{ textDecoration: "none" }}>
          <Button className={classes.button}>Movies</Button>
        </Link>

*/
}
