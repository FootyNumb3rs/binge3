import React, { useState } from "react";
import "./App.css";
import MainBar from "./components/MainBar";
import "./styles/home.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Title from "./pages/Title";
import Browse from "./pages/Browse";

function App() {
  const [showBar, setBar] = useState(true);
  const [page, setPage] = useState("");
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
        href="https://fonts.googleapis.com/css?family=Overpass:400,600|Questrial|Heebo|Rubik|Roboto+Thin|Roboto:300,400,500,700|DM+Serif+Display&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Arvo|Ibarra+Real+Nova|Merriweather|Noto+Serif|Playfair+Display|Roboto+Slab|Varela+Round|Vollkorn&display=swap"
        rel="stylesheet"
      />

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
      <link
        href="https://fonts.googleapis.com/css?family=Gothic+A1&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=DM+Sans&display=swap"
        rel="stylesheet"
      ></link>

      <script src="lodash.js" />

      <React.Fragment>
        <Router>
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
                <Home {...props} setBar_={setBar} setPage={setPage} />
              )}
            />

            <Route
              path="/browse/:media_type"
              exact
              render={props => (
                <Browse {...props} setBar_={setBar} setPage={setPage} />
              )}
            />

            <Route
              path="/search/:search_query"
              exact
              render={props => (
                <Browse {...props} setBar_={setBar} setPage={setPage} />
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
