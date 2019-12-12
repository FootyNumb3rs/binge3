import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import StarIcon from "@material-ui/icons/Star";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../styles/mobile-media-card.css";

//const _ = require("lodash");
const cardHeight = "13vh";
const cardWidth = (2 / 3) * cardHeight;

const useStyles = makeStyles(theme => ({
  card: {
    height: cardHeight,
    width: "100vw",
    borderRadius: 0,
    backgroundColor: "#121212"
  },
  media: {
    //height: 140
  }
}));

const getRatingColor = rating => {
  if (!rating) {
    return "gray";
  } else {
    if (rating < 6) {
      return "#F44336";
    } else if (rating < 7) {
      return "#FB8C00";
    } else if (rating < 7.5) {
      return "#FFEE58";
    } else {
      return "#66BB6A";
    }
  }
};

export default function MediaCard({ media_, openDialogue }) {
  const {
    title,
    genres,
    release,
    posterLink,
    rating,
    media_type,
    id,
    first_air_date
  } = media_;
  const classes = useStyles();
  const release_ = new Date(release);
  const first_air_date_ = new Date(first_air_date);

  return (
    <Link
      to={{
        pathname: `/title/${media_type}/${id}`
      }}
    >
      <Card className={classes.card}>
        <CardActionArea style={{ width: "100%" }} /* Take care of this */>
          <SkeletonTheme
            color="#202020"
            highlightColor="#444"
            borderRadius="0px"
          >
            <div className="mobile-card-div">
              <div className="mobile-card-img-div">
                <img src={posterLink} alt="" className="mobile-card-img" />
              </div>
              <div className="mobile-card-text-div">
                <div className="mobile-card-title">
                  {title || <Skeleton width="50%" />}
                </div>

                <div className="mobile-card-genres">
                  {genres.slice(0, 2).join(", ") || <Skeleton width="40%" />}
                </div>

                <div className="mobile-card-etc">
                  {(media_type == "movie"
                    ? release_.toDateString().slice(4)
                    : first_air_date_.toDateString().slice(4)) || (
                    <Skeleton width="30%" />
                  )}
                </div>
                <div className="mobile-card-etc">
                  <Chip
                    size="small"
                    variant="outlined"
                    label={rating}
                    className="mobile-vue-rating-chip"
                    style={{ color: getRatingColor(rating) }}
                    icon={
                      <StarIcon
                        style={{
                          width: "3.2vw", // Do this
                          color: getRatingColor(rating)
                        }}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </SkeletonTheme>
        </CardActionArea>
      </Card>
    </Link>
  );
}
