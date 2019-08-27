import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Showcase from "../components/Showcase";

export default function Home({ movieList, handleOpen, mode, search }) {
  return (
    <div>
      <AwesomeSlider bullets={false}>
        <div data-src="https://image.tmdb.org/t/p/original//fudEG1VUWuOqleXv6NwCExK0VLy.jpg" />
        <div data-src="https://image.tmdb.org/t/p/original//8YA36faYlkpfp6aozcGsqq68pZ9.jpg" />
        <div data-src="https://image.tmdb.org/t/p/original//yIZ1xendyqKvY3FGeeUYUd5X9Mm.jpg" />
      </AwesomeSlider>

      {/* Content */}

      <div className={"content"}>
        <div className={"showcase-div"}>
          <Showcase
            mediaData={movieList}
            openDialogue={handleOpen}
            mode_={mode}
            search_={search}
          />
        </div>
      </div>
    </div>
  );
}
