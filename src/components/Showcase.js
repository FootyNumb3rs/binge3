import React from "react";
import MediaCard from "./MediaCard";
import MobileMediaCard from "./MobileMediaCard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "../styles/showcase.css";

const useStyles = makeStyles(theme => ({}));

export default function Showcase({
  mediaData,
  searchChange,
  openDialogue,
  mode_,
  search_
}) {
  const classes = useStyles();

  return (
    <div className="showcase">
      <div className={"headers"}>
        {`${
          mode_ == "Trending Shows" || mode_ == "Trending Movies"
            ? mode_
            : `${mode_} "${search_}"`
        }`}{" "}
      </div>

      <div className={"wrapper"}>
        {mediaData.slice(0, 5).map(media => {
          return (
            <div key={media.id}>
              <MediaCard media_={media} openDialogue={openDialogue} />
            </div>
          );
        })}
      </div>
      <div className={"mobile-wrapper"}>
        {mediaData.slice(0, 5).map(media => {
          return (
            <div key={media.id}>
              <MobileMediaCard media_={media} openDialogue={openDialogue} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
