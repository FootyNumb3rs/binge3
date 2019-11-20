import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
/* 
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
*/
import "../styles/mobile-media-card.css";

//const _ = require("lodash");
const cardHeight = "14vh";
const cardWidth = (2 / 3) * cardHeight;

const useStyles = makeStyles(theme => ({
  card: {
    height: cardHeight,
    width: "100vw",
    borderRadius: 0,
    //margin: 15,
    backgroundColor: "black"
  },
  media: {
    //height: 140
  }
}));

export default function MediaCard({ media_, openDialogue }) {
  const { title, genres, release, posterLink } = media_;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea style={{ width: "100%" }}>
        <div className="mobile-card-div">
          <div className="mobile-card-img-div">
            <img src={posterLink} alt="" className="mobile-card-img" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div className="mobile-card-title">{title}</div>
            <div className="mobile-card-genres">
              {genres.slice(0, 2).join(", ").toUpperCase()}
            </div>
            <div className="mobile-card-genres" style={{ color: "white" }}>
              {release}
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
