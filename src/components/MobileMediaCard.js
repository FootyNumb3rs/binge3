import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import StarRatings from "react-star-ratings";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
/* 
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
*/
import "../styles/mobile-media-card.css";

//const _ = require("lodash");
const cardHeight = "13vh";
const cardWidth = (2 / 3) * cardHeight;

const useStyles = makeStyles(theme => ({
  card: {
    height: cardHeight,
    width: "100vw",
    borderRadius: 0,
    //margin: 15,
    backgroundColor: "#121212"
  },
  media: {
    //height: 140
  }
}));

export default function MediaCard({ media_, openDialogue }) {
  const { title, genres, release, posterLink, rating, media_type, id } = media_;
  const classes = useStyles();
  const release_ = new Date(release);

  return (
    <Link
      to={{
        pathname: `/title/${media_type}/${id}`
      }}
    >
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
              <div
                className="mobile-card-title"
                style={{ paddingBottom: ".5px" }}
              >
                {title}
              </div>
              <div className="mobile-card-genres">
                {genres.slice(0, 2).join(", ")}
              </div>
              <div className="mobile-card-etc">
                {release_.toDateString().slice(4)}
              </div>
              <div className="mobile-card-etc">
                <StarRatings
                  rating={1}
                  starRatedColor="yellow"
                  starDimension="10px"
                  starSpacing=".4px"
                  //changeRating={this.changeRating}
                  numberOfStars={1}
                  name="rating"
                />
                {` ${rating}/10 `}
              </div>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Link>
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
