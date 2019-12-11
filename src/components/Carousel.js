import React from "react";
import MediaCard from "./MediaCard";
//import MobileMediaCard from "./MobileMediaCard";
import "../styles/carousel.css";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import Chip from "@material-ui/core/Chip";

function Carousel({
  mediaData,
  type,
  history,
  carouselState,
  setCarouselState,
  id_
}) {
  const pr = () => {
    console.log("yo");
  };

  const settings = {
    initialSlide: carouselState[`slide${id_}`],
    afterChange: (current, next) => setCarouselState(current),

    infinite: false,
    speed: 350,
    slidesToShow: 6,
    slidesToScroll: 1,
    touchThreshold: 15,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <div className="carousel-title">
          {type == "movie"
            ? "Popular Movies"
            : type == "theaters"
            ? "New & Upcoming"
            : "Popular Shows"}
        </div>
        <div
          onClick={() => history.push(`/browse/${type}`)}
          className="carousel-see-all"
        >
          SEE ALL
        </div>
      </div>
      <Slider {...settings}>
        {mediaData.slice(0, 10).map((media, i) => {
          return (
            <div className="carousel-item-wrapper">
              <div className="carousel-item" key={media.id}>
                <MediaCard rp={i} media_={media} />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default withRouter(Carousel);

/*

<div className="preview-panel">
      <div className={"header"}>
        <div className="header-title">{type}</div>
        <div
          onClick={console.log("yo")}
          style={{ marginBottom: 5, color: "#B3B3B3", width: 100, height: 100 }}
        >
          See All
        </div>
      </div>
      <div
        style={{
          width: "50px",
          opacity: 0.8,
          height: 2,
          backgroundColor: "#42a5f5",
          marginBottom: 40,
          borderRadius: 4
        }}
      />
      <div className={"wrapper"}>
        {mediaData.slice(0, 5).map(media => {
          return (
            <div key={media.id}>
              <MediaCard media_={media} />
            </div>
          );
        })}
      </div>

      <div className={"mobile-wrapper"}>
        {mediaData.slice(0, 5).map(media => {
          return (
            <div key={media.id}>
              <MobileMediaCard media_={media} />
            </div>
          );
        })}
      </div>
    </div>




*/
