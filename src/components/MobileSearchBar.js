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
    flexGrow: 1,
    type: "search",
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

    ["@media (max-width: 620px)"]: {
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
      flexGrow: 1,
      padding: theme.spacing(1, 2.5, 1, 6.5)
    }
  }
}));

function MobileSearchBar({
  searchSubmit,
  history,
  setBar,
  barOpen,
  setBrowserState,
  browserState
}) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const onChange = (e, index, value) => {
    setSearch(e.target.value);
  };
  console.log(setBrowserState);

  return (
    <div className="mobile-search-bar-div-outer">
      <div
        className="mobile-search-bar-div-inner"
        onClick={(e, offset) => setBar(!barOpen)}
      >
        <ArrowBackIcon />
      </div>
      <div className={classes.searchBar}>
        <div className="search-icon">
          <SearchIcon />
        </div>
        <InputBase
          type="search"
          placeholder="Search by title..."
          className="search-bar"
          classes={{ root: classes.inputRoot, input: classes.inputInput }}
          onChange={onChange}
          onKeyPress={ev => {
            //console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === "Enter") {
              setBrowserState({
                ...browserState,
                content_list: []
              });
              if (search.length > 0) history.push(`/search/${search}`);
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
