import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/app-bar.css";

export default function MenuButton({ label, route, page }) {
  //const classes = useStyles();
  const app_page = "movies";

  return (
    <div className="menu-button-container">
      <div className="menu-button-div">
        <div className="menu-button-div-1">
          <Link
            to={route.length < 2 ? `${route}` : `/browse/${route}`}
            className="link"
          >
            <div
              className={
                page == route ? "menu-label-clicked" : "menu-label-unclicked"
              }
            >
              {label}
            </div>
          </Link>
        </div>
        <div
          className={
            page == route ? "underline-clicked" : "underline-unclicked"
          }
        />
      </div>
    </div>
  );
}
