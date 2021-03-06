import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import "../styles/media-card.css";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// const _ = require("lodash"); Throws console warning

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: "block",
    textAlign: "initial"
  },
  actionArea: {
    "&:hover $focusHighlight": {
      opacity: 0.38
    }
  },
  focusHighlight: {}
}));

export default function MediaCard({ media_, openDialogue, rp }) {
  const { id, media_type, title, genres, posterLink } = media_;
  const classes = useStyles();
  // const rightPad = ((rp + 1) % 3 == 0) & (rp > 0) ? "0px" : "15px"; // Every third
  // const leftPad = rp % 3 == 0 ? "15px" : "0px";
  return (
    <div className="card-container">
      <div>
        <SkeletonTheme color="#202020" highlightColor="#444" borderRadius="0px">
          <Link
            to={{
              pathname: `/title/${media_type}/${id}`
            }}
          >
            <Card className="card">
              <CardActionArea
                classes={{
                  root: classes.actionArea,
                  focusHighlight: classes.focusHighlight
                }}
              >
                {posterLink ? (
                  <CardMedia image={posterLink} className="media" />
                ) : (
                  <Skeleton height="300px" width="400px" />
                )}
              </CardActionArea>
            </Card>
          </Link>

          <div className="cardText">
            <Typography className="title">
              {title || <Skeleton width="90%" height="40%" />}
            </Typography>

            <Typography className="genres">
              {genres[0] || <Skeleton width="60%" />}
            </Typography>
          </div>
        </SkeletonTheme>
      </div>
    </div>
  );
}
