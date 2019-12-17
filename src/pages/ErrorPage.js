import React, { PureComponent } from "react";
import "../styles/title-page.css";
import { getCredits, getDialogContent } from "../tools/pullData.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getById } from "../tools/pullData.js";
import MobileTitle from "./MobileTitle.js";
import ActorCard from "../components/ActorCard.js";
import DesktopActorCard from "../components/DesktopActorCard.js";
import StarIcon from "@material-ui/icons/Star";
import HomeIcon from "@material-ui/icons/Home";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";

export default class ErrorPage extends PureComponent {
  render(props) {
    return (
      <div
        style={{
          color: "white",
          minHeight: "100vh",
          minWidth: "100vw",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            fontFamily: "Inter",
            fontSize: "25px",
            fontWeight: 550
          }}
        >
          <div>Sorry, there's a problem</div>
          <div
            style={{
              marginTop: "18px",
              fontSize: 15,
              color: "darkgray",
              textAlign: "center"
            }}
          >
            If this persists, the data provider may be temporarily down
          </div>
          {/*
          <Link
            to={{
              pathname: `/`
            }}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="secondary"
              style={{
                marginTop: "45px",
                fontSize: "14px",
                backgroundColor: "#2196F3",
                color: "white",
                fontWeight: 700
              }}
            >
              {" "}
              Go to Homepage
            </Button>
          </Link>
  */}
        </div>
      </div>
    );
  }
}
