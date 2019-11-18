import React from "react";
import "./App.css";
import MainBar from "./components/MainBar";
//import { makeStyles } from "@material-ui/core/styles";

import "./styles/main-app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";

import Title from "./pages/Title";
import Browse from "./pages/Browse";

function App() {
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
      <link
        href="https://fonts.googleapis.com/css?family=Overpass:400,600|Questrial|Heebo:100|Rubik:300|Roboto:300,400,500,700|DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,600&display=swap"
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
      <script src="lodash.js" />

      <React.Fragment>
        <Router>
          <MainBar
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
            <Route path="/" exact component={Home} />
            <Route exact path="/browse/:media_type" component={Browse} />
            <Route exact path="/search/:search_query" component={Browse} />
            <Route path="/title/:media_type/:id" component={Title} />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
