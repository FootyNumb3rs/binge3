import React, { PureComponent } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Carousel from "../components/Carousel";
import "../styles/home.css";
import { getTrending, getGenres, getInTheaters } from "../tools/pullData";
import Slider from "react-slick";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      preview_movies: [],
      preview_shows: [],
      preview_in_theaters: []
    };

    props.setBar_(true);

    //this.slider.slickGoTo(0);

    getGenres().then(data => {
      var genres_ = Object.assign(data[0], data[1]);

      this.setState({ genres: genres_ });

      if (this.props.carouselMedia.preview_shows.length == 0) {
        this.previewMovies();
      }
      if (this.props.carouselMedia.preview_shows.length == 0) {
        this.previewShows();
      }
      if (this.props.carouselMedia.preview_shows.length == 0) {
        this.previewInTheaters();
      }
    });
  }

  getViewPanel = media => {
    return (
      <div>
        <div
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            style={{ width: "100%", opacity: 0.3, backgroundColor: "#424242" }}
            src={media.backdropLink}
            img
          />

          <div
            style={{
              position: "absolute",
              maxWidth: "80vw",
              width: "100%",
              //paddingLeft: "0px",
              zIndex: "1000",
              //bottom: "60px",
              fontSize: "100px",
              justifyContent: "center",
              alignItems: "flex-start",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "20px",
                fontFamily: "Inter",
                fontWeight: 600,
                width: "50%",
                lineHeight: 2
              }}
            >
              {media.release.slice(0, 4)}
            </div>
            <div
              style={{
                color: "white",
                fontSize: "42px",
                fontFamily: "Inter",
                fontWeight: 600,
                marginBottom: 5,
                marginTop: 20,
                lineHeight: 1
              }}
            >
              {media.title}
            </div>

            <div
              style={{
                color: "white",
                fontSize: "15.5px",
                fontFamily: "Inter",
                fontWeight: 500,
                width: "50%",
                marginTop: "13px"
              }}
            >
              {media.genres
                .map(g => {
                  return g;
                })
                .join(" / ")}
            </div>
            <div
              style={{
                //color: "white",
                fontSize: "25px",
                marginTop: "25px"
                //fontFamily: "Inter",
                //fontWeight: 200,
                //width: "50%",
                //lineHeight: 2
              }}
            >
              <Button
                style={{
                  fontSize: "14px",
                  borderRadius: "20px",
                  backgroundColor: "#0288d1"
                }}
                variant="contained"
                color="primary"
              >
                SEE MORE
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  previewMovies = () => {
    getTrending(this.state.genres, "movie").then(data => {
      var all_data = [];

      data[0].results.forEach(d => {
        all_data.push(d);
      });
      this.props.setCarouselMedia({
        ...this.props.carouselMedia,
        preview_movies: all_data
      });
    });
  };

  previewInTheaters = () => {
    getInTheaters(this.state.genres).then(data => {
      var all_data = [];
      data[0].results.forEach(d => {
        all_data.push(d);
      });
      this.props.setCarouselMedia({
        ...this.props.carouselMedia,
        preview_in_theaters: all_data
      });
    });
  };

  previewShows = () => {
    getTrending(this.state.genres, "tv").then(data => {
      var all_data = [];
      data[0].results.forEach(d => {
        all_data.push(d);
      });
      this.props.setCarouselMedia({
        ...this.props.carouselMedia,
        preview_shows: all_data
      });
    });
  };

  render(props) {
    console.log(this.props.carouselMedia);
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    this.props.setPage("");
    return (
      <div style={{ overflow: "hidden" }}>
        <Slider {...settings} style={{ width: "100vw", height: "56.17977vw" }}>
          {this.props.carouselMedia.preview_movies[0] ? (
            this.props.carouselMedia.preview_movies.map(media => {
              return this.getViewPanel(media);
            })
          ) : (
            <div>
              <div
                style={{
                  width: "100vw",
                  height: "56.17977vw",
                  background: "#424242",
                  opacity: ".5"
                }}
                //src="https://image.tmdb.org/t/p/original//6Xsz9KHQmCcIcj3CoWQq5eLtVoT.jpg"
              />
            </div>
          )}
          {/*
          <div>
            <img
              style={{ width: "100%" }}
              src="https://image.tmdb.org/t/p/original//6Xsz9KHQmCcIcj3CoWQq5eLtVoT.jpg"
              img
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://image.tmdb.org/t/p/original//n6bUvigpRFqSwmPp1m2YADdbRBc.jpg"
              img
            />
          </div> */}
        </Slider>

        {/* Content  1130, 950 */}
        <div className="content">
          <div className="showcase-div">
            <div className="carousel-div">
              <Carousel
                type="tv"
                mediaData={this.props.carouselMedia.preview_shows}
              />
              <div className="home-divider" />

              <Carousel
                type="movie"
                mediaData={this.props.carouselMedia.preview_movies}
              />
              <div className="home-divider" />

              <Carousel
                type="theaters"
                mediaData={this.props.carouselMedia.preview_in_theaters}
              />
            </div>
          </div>
        </div>
        <div className="signature">
          Made by Tande Mungwa with TMDB and React.js
        </div>
      </div>
    );
  }
}
