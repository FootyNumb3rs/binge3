import React, { PureComponent } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Carousel from "../components/Carousel";
import "../styles/home.css";
import { getTrending, getGenres, getInTheaters } from "../tools/pullData";
import Slider from "react-slick";

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
          <div>
            <img
              style={{ width: "100%" }}
              src="https://image.tmdb.org/t/p/original//n3UanIvmnBlH531pykuzNs4LbH6.jpg"
              img
            />
          </div>

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
          </div>
        </Slider>

        {/* Content */}
        <div className="content">
          <div className="showcase-div">
            <div
              style={{
                maxWidth: "1130px",
                width: "100%"
              }}
            >
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
