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
  const rightPad = (rp % 3 == 0) & (rp > 0) ? "10px" : "0px";
  return (
    <div className="card-container" style={{ paddingRight: rightPad }}>
      <div className="card">
        <Link
          to={{
            pathname: `/title/${media_type}/${id}`
          }}
        >
          <Card className="card" style={{ borderRadius: 0 }}>
            <CardActionArea
              classes={{
                root: classes.actionArea,
                focusHighlight: classes.focusHighlight
              }}
              onClick={() => console.log("click")}

              /* Throwing error
            onTouchTap={e => {
              e.preventDefault();
              console.log("click");
            }}
            */
            >
              <CardMedia image={posterLink} className={"media"} />
            </CardActionArea>
          </Card>
        </Link>

        <div className={"cardText"}>
          <Typography className={"title"}>{title}</Typography>
          <SkeletonTheme
            color="#202020"
            highlightColor="#444"
            borderRadius="0px"
          >
            <Typography className={"genres"}>
              {genres.slice(0, 2).join(", ") || <Skeleton />}
            </Typography>
          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
}
