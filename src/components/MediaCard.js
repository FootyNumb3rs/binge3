import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import "../styles/media-card.css";
import { Link } from "react-router-dom";

const _ = require("lodash");

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

export default function MediaCard({ media_, openDialogue }) {
  const { title, genres, posterLink, backdropLink } = media_;
  const classes = useStyles();
  return (
    <div>
      <Link to={{ pathname: "/title", state: { title: title } }}>
        <Card className={"card"}>
          <CardActionArea
            classes={{
              root: classes.actionArea,
              focusHighlight: classes.focusHighlight
            }}
            onClick={() => console.log("click")}
            onTouchTap={e => {
              e.preventDefault();
              console.log("click");
            }}
          >
            <CardMedia image={posterLink} className={"media"} />
          </CardActionArea>
        </Card>
      </Link>

      <div className={"cardText"}>
        <Typography className={"title"}>{title}</Typography>
        <Typography className={"genres"}>
          {genres.slice(0, 2).join(", ")}
        </Typography>
      </div>
    </div>
  );
}
