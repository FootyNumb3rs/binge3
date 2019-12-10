import React, { useState } from "react";
import "./App.css";
import MainBar from "./components/MainBar";
import MobileMainBar from "./components/MobileMainBar";
import "./styles/home.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Title from "./pages/Title";
import Browse from "./pages/Browse";
import MovieBrowser from "./pages/MovieBrowser";
import ShowBrowser from "./pages/ShowBrowser";
import TheaterBrowser from "./pages/TheaterBrowser";
import SearchBrowser from "./pages/SearchBrowser";
import { makeStyles } from "@material-ui/core/styles";

import ScrollMemory from "react-router-scroll-memory";

function App() {
  ///const classes = useStyles();
  const [showBar, setBar] = useState(true);
  const [page, setPage] = useState("");
  const [carouselMedia, setCarouselMedia] = useState({
    preview_movies: [],
    preview_shows: [],
    preview_in_theaters: []
  });

  const [movieBrowserState, setMovieBrowserState] = useState({
    content_list: [],
    genres: {},
    next_page: 2,
    total_pages: undefined,
    paginationPage: 1
  });

  const [showBrowserState, setShowBrowserState] = useState({
    content_list: [],
    genres: {},
    next_page: 2,
    total_pages: undefined,
    paginationPage: 1
  });

  const [theaterBrowserState, setTheaterBrowserState] = useState({
    content_list: [],
    genres: {},
    next_page: 2,
    total_pages: undefined,
    paginationPage: 1
  });

  const [searchBrowserState, setSearchBrowserState] = useState({
    content_list: [],
    genres: {},
    next_page: 2,
    total_pages: undefined,
    paginationPage: 1
  });

  // Side Drawer ---------------
  /*
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
*/

  // Change States

  // Not sure
  //const handleOnDragStart = e => e.preventDefault();

  return (
    <div className="root">
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      ></meta>

      <link
        rel="stylesheet"
        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
      />

      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <script src="lodash.js" />

      <React.Fragment>
        <Router>
          <ScrollMemory />

          <MobileMainBar
            show={showBar}
            setPage={setPage}
            page={page}

            //handleDrawerOpen={toggleDrawer("right", true)}
          />

          <MainBar
            show={showBar}
            setPage={setPage}
            page={page}

            //handleDrawerOpen={toggleDrawer("right", true)}
          />
          {/*
          <SwipeableDrawer
            open={state.right}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            <SideDrawer />
          </SwipeableDrawer>
          */}
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home
                  {...props}
                  setBar_={setBar}
                  setPage={setPage}
                  setCarouselMedia={setCarouselMedia}
                  carouselMedia={carouselMedia}
                />
              )}
            />

            <Route
              path="/browse/movie"
              exact
              render={props => (
                <MovieBrowser
                  {...props}
                  setBar_={setBar}
                  setPage={setPage}
                  movieBrowserState={movieBrowserState}
                  setMovieBrowserState={setMovieBrowserState}
                />
              )}
            />

            <Route
              path="/browse/tv"
              exact
              render={props => (
                <ShowBrowser
                  {...props}
                  setBar_={setBar}
                  setPage={setPage}
                  showBrowserState={showBrowserState}
                  setShowBrowserState={setShowBrowserState}
                />
              )}
            />

            <Route
              path="/browse/theaters"
              exact
              render={props => (
                <TheaterBrowser
                  {...props}
                  setBar_={setBar}
                  setPage={setPage}
                  theaterBrowserState={theaterBrowserState}
                  setTheaterBrowserState={setTheaterBrowserState}
                />
              )}
            />

            {/*
            <Route
              path="/browse/:media_type"
              exact
              render={props => (
                <Browse
                  {...props}
                  setBar_={setBar}
                  setPage={setPage}
                  browserMedia={browserMedia}
                  setBrowserMedia={setBrowserMedia}
                />
              )}
            />
              */}

            <Route
              path="/search/:search_query"
              exact
              render={props => (
                <SearchBrowser
                  {...props}
                  setBar_={setBar}
                  setPage={setPage}
                  searchBrowserState={searchBrowserState}
                  setSearchBrowserState={setSearchBrowserState}
                />
              )}
            />

            <Route
              path="/title/:media_type/:id"
              render={props => <Title {...props} setBar_={setBar} />}
            />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
