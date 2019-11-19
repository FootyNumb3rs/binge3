import React from "react";
import MediaCard from "./MediaCard";
//import MobileMediaCard from "./MobileMediaCard";
import "../styles/carousel.css";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";

function Carousel({ mediaData, type, history }) {
  const yo = () => {
    console.log("yo");
  };

  const settings = {
    infinite: false,
    speed: 350,
    slidesToShow: 5,
    slidesToScroll: 1,
    touchThreshold: 15,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
          arrows: false
        }
      }
    ]
  };
  return (
    <div style={{ marginBottom: "37px", paddingLeft: "0px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: "22px",
          paddingRight: "22px",
          paddingLeft: "20px",
          fontFamily: "Roboto",
          fontWeight: 100
        }}
      >
        <div
          style={{
            color: "gainsboro",
            fontSize: 20,
            fontWeight: 500
          }}
        >
          {type == "movie" ? "Now Playing" : "Popular Shows"}
        </div>
        <div
          style={{
            color: "gray",
            fontSize: 14,
            justifyContent: "flex-end",
            //paddingTop: "2px",
            //fontFamily: "Roboto",
            fontWeight: 400
          }}
        >
          See All
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
