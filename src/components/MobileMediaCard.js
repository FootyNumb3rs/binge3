import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "../styles/mobile-media-card.css";

const _ = require("lodash");
const cardHeight = 140;
const cardWidth = (2 / 3) * cardHeight;

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "100%",
    borderRadius: 0,
    marginBottom: 10,
    backgroundColor: "black"
  },
  media: {
    //height: 140
  }
}));

export default function MediaCard({ media_, openDialogue }) {
  const { title, genres, posterLink, backdropLink } = media_;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{ height: cardHeight, width: cardWidth, paddingLeft: 25 }}
          >
            <img
              src={posterLink}
              style={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
                borderRadius: 10
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "Roboto",
                color: "white",
                padding: "3px 14px",
                fontSize: 15,
                fontWeight: 400
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: "Roboto Thin",
                color: "white",
                padding: "2px 14px",
                fontSize: 15,
                fontWeight: 500
              }}
            >
              {genres.slice(0, 3).join(", ")}
            </div>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
}

{
  /*
import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import "../styles/mobile-media-card.css";


const _ = require("lodash");

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: "flex"
    //textAlign: "initial"
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
    <Card className={"card"}>
      <CardActionArea
        classes={{
          root: classes.actionArea,
          focusHighlight: classes.focusHighlight
        }}
        onClick={() => {
          openDialogue(media_);
        }}
        onTouchTap={e => {
          e.preventDefault();
          openDialogue();
          console.log(title);
        }}
      >
        <CardMedia image={posterLink} className={"media"} />
        <div className={"cardText"}>
          <Typography className={"title"}>{title}</Typography>
          <Typography className={"genres"}>
            {genres.slice(0, 2).join(", ")}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
}
*/
}
