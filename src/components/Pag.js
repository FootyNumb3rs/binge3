import React, { useState } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { makeStyles } from "@material-ui/core/styles";

export default function Pag({ changePage }) {
  const theme = createMuiTheme();

  const [offset, changeOffset] = useState(0);

  function handleClick(offset) {
    changeOffset(offset);
  }

  const useStyles = makeStyles(theme => ({
    pagination: {
      text: { color: "green" }
    }
  }));

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Pagination
        limit={10}
        offset={offset}
        total={100}
        onClick={(e, offset) => {
          handleClick(offset);
          changePage(offset + 1);
          window.scrollTo(0, 0);
        }}
        classes={classes.pagination}
      />
    </MuiThemeProvider>
  );
}
