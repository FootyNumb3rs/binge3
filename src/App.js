import React, { useState, useEffect } from "react";
import "./App.css";
import MainBar from "./components/MainBar";
import { makeStyles, fade } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import PopUp from "./components/PopUp";
import SideDrawer from "./components/SideDrawer";

import "./styles/main-app.css";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Gallery from "./pages/Gallery";
import Title from "./pages/Title";
import Browse from "./pages/Browse";

import {
  getGenres,
  getTrending,
  getSearch,
  getDialogContent
} from "./tools/pullData";

{
  /* CREATE MUI THEME */
}
const defaultTheme = createMuiTheme;
const backgroundColor = "#000000";
const drawerWidth = 240;
{
  /* THEMES */
}

{
  /* CLASSES */
}
const useStyles = makeStyles(theme => ({
  // Drawer
  content: {}
}));

{
  /* MAIN APP  */
}

function App() {
  const classes = useStyles();
  const [mode, setMode] = useState("Trending Shows");
  const [queryTerm, setQueryTerm] = useState("");
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState({});

  // Side Drawer ---------------
  const [state, setState] = React.useState({
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

  // -----------------

  // Change States
  const onQueryChange = (e, index, value) => {
    setQueryTerm(e.target.value);
  };

  const onModeChange = mode_ => {
    //window.scrollTo(0, 0);
    setMode(mode_);
  };

  // Submit Search
  const onSearchSubmit = () => {
    setSearch(queryTerm);
  };

  // Get Trending Shows
  const getTrendingShows = (gen = genres) => {
    //onModeChange("");
    getTrending(gen, "tv").then(data => {
      var all_data = [];
      data.forEach(d => {
        all_data.push(...d);
      });
      setMovieList(all_data);
      onModeChange("Trending Shows");
      //setSearch("");
    });
  };

  // Get Trending Films
  const getTrendingFilms = () => {
    //onModeChange("");
    getTrending(genres, "movie").then(data => {
      var all_data = [];
      data.forEach(d => {
        all_data.push(...d);
      });
      setMovieList(all_data);
      onModeChange("Trending Movies");
      //setSearch("");
    });
  };

  // Get TV Data
  useEffect(() => {
    getGenres().then(data => {
      var genres_ = Object.assign(data[0], data[1]);
      getTrendingShows(genres_);
      setGenres(genres_);
    });
  }, []);

  const handleOnDragStart = e => e.preventDefault();

  useEffect(() => {
    if (search.length == 0) {
    } else {
      getSearch(genres, search).then(data => {
        var all_data = [];
        data.forEach(d => {
          all_data.push(...d);
        });

        setMovieList(all_data);
        onModeChange("Search results for");
      });
    }
  }, [search]);

  return (
    <div className={"root"}>
      <link
        href="https://fonts.googleapis.com/css?family=Overpass:400,600|Questrial|Heebo:100|Rubik:300|Roboto:300,400,500,700|DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600&display=swap"
        rel="stylesheet"
      />
      <script src="lodash.js" />

      <React.Fragment>
        <Router>
          <MainBar
            handleDrawerOpen={toggleDrawer("right", true)}
            queryChange={onQueryChange}
            searchSubmit={onSearchSubmit}
            trendingShows={getTrendingShows}
            trendingFilms={getTrendingFilms}
            search={search}
          />
          <SwipeableDrawer
            open={state.right}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            <SideDrawer />
          </SwipeableDrawer>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home movieList={movieList} mode={mode} search={search} />
              )}
            />
            <Route
              path="/search"
              render={props => <Search search={search} />}
            />
            <Route path="/browse" component={Browse} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/title" component={Title} />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
