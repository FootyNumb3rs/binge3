import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  searchBar: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius + 15,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    menuButton: { padding: 0 }
  },
  inputRoot: {
    color: "lightgray",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: 16,
    flexShrink: 1,
    //height: 29,

    ["@media (max-width: 620px)"]: {
      //display: "none",
      //flexGrow: 1,
      flexShrink: 1,
      height: 29,
      fontSize: 14
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6.5),
    width: "auto",
    flexShrink: 1,

    ["@media (max-width: 620px)"]: {
      //display: "none",
      //flexGrow: 1,
      flexShrink: 1,
      padding: theme.spacing(1, 3, 1, 6.5)
    }
  }
}));

function MobileSearchBar({ searchSubmit, history, setBar, barOpen }) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const onChange = (e, index, value) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mobile-search-bar">
      <div
        style={{
          margin: "0px 10px",
          display: "flex",
          alignItems: "center"
        }}
        onClick={(e, offset) => setBar(!barOpen)}
      >
        <ArrowBackIcon />
      </div>
      <div className={classes.searchBar}>
        <div className={"search-icon"}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search by title..."
          className="search-bar"
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          onChange={onChange}
          onKeyPress={ev => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === "Enter") {
              history.push(`/search/${search}`);
              //setBar(!barOpen);
              ev.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(MobileSearchBar);
