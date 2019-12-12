import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { makeStyles } from "@material-ui/core/styles";

export default function Pag({ changePage, browserState, setBrowserState }) {
  const theme = createMuiTheme();

  console.log(browserState);
  //const [offset, changeOffset] = useState(0);

  function handleClick(offset) {
    setBrowserState({
      ...browserState,
      paginationPage: offset + 1,
      content_list: []
    });
  }

  const useStyles = makeStyles(theme => ({
    label: {
      color: "white",
      fontSize: "15px"
    },

    current: {
      backgroundColor: "gray",
      "&:hover": {
        backgroundColor: "darkgray"
      }
    },

    rootStandard: {
      "&:hover": {
        backgroundColor: "#424242"
      }
    },
    rootEnd: {
      fontWeight: 100,
      "&:hover": {
        backgroundColor: "#424242"
      }
    }
  }));

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Pagination
        limit={1}
        offset={browserState.paginationPage - 1}
        total={7}
        onClick={(e, offset_) => {
          handleClick(offset_);
          console.log(offset_);
          changePage(offset_ + 1);
          window.scrollTo(0, 0);
        }}
        classes={{
          label: classes.label,
          rootCurrent: classes.current,
          rootStandard: classes.rootStandard,
          rootEnd: classes.rootEnd
        }}
      />
    </MuiThemeProvider>
  );
}
