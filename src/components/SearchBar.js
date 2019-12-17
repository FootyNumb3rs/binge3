import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  searchBar: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(2),
    borderRadius: theme.shape.borderRadius + 15,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    menuButton: { padding: 0 }
  },
  inputRoot: {
    color: "white",
    fontFamily: "Helvetica",
    fontSize: 15,
    flexShrink: 1,
    //height: 29,

    ["@media (max-width: 620px)"]: {
      //display: "none",
      flexGrow: 1,
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
      flexGrow: 1,
      padding: theme.spacing(1, 1, 1, 2.5)
    }
  }
}));

function SearchBar({ searchSubmit, history, setBrowserState, browserState }) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const onChange = (e, index, value) => {
    setSearch(e.target.value);
  };

  //console.log(setBrowserState);

  return (
    <div className="search-bar">
      <div className={classes.searchBar}>
        <div className={"search-icon"}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search..."
          className="search-bar"
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          onChange={onChange}
          onKeyPress={ev => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === "Enter" && search.trim().length > 0) {
              /*
              setBrowserState({
                ...browserState,
                content_list: []
              });
              */
              history.push(`/search/${search}`);
              ev.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
}

export default withRouter(SearchBar);
