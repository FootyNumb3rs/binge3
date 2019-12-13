import React, { PureComponent } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Carousel from "../components/Carousel";
import "../styles/home.css";
import { getTrending, getGenres, getInTheaters } from "../tools/pullData";
import Slider from "react-slick";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      preview_movies: [],
      preview_shows: [],
      preview_in_theaters: []
    };

    props.setBar_(true);

    this.exampleRef = React.createRef();

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
        <div className="view-panel-container">
          <img
            /*style={{ width: "100%", opacity: 0.3, backgroundColor: "#424242" }}*/
            src={media.backdropLink}
          />

          <div className="view-panel-div">
            <div className="view-release">{media.release.slice(0, 4)}</div>
            <div className="view-title">{media.title}</div>

            <div className="view-genres">
              {media.genres
                .map(g => {
                  return g;
                })
                .join(" • ")}
            </div>
            <div className="view-button">
              <Link
                to={{
                  pathname: `/title/${media.media_type}/${media.id}`
                }}
              >
                {/*
                <Button variant="contained" color="primary">
                  SEE MORE
              </Button> */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  setCarouselOne = current => {
    this.props.setCarouselState({
      ...this.props.carouselState,
      slideOne: current
    });
  };

  setCarouselTwo = current => {
    this.props.setCarouselState({
      ...this.props.carouselState,
      slideTwo: current
    });
  };

  setCarouselThree = current => {
    this.props.setCarouselState({
      ...this.props.carouselState,
      slideThree: current
    });
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

  componentDidMount() {
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.preventTouch, { passive: false });
    //this.exampleRef.current.slickGoTo(3);
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.preventTouch, {
      passive: false
    });
  }

  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e) {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }

  render(props) {
    console.log(this.props.carouselState);

    console.log(this.exampleRef.current);

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            //initialSlide: carouselState,
            //afterChange: (current, next) => setCarouselState(current),

            arrows: false
          }
        }
      ],

      initialSlide: this.props.carouselState.bigView,
      afterChange: (current, next) =>
        this.props.setCarouselState({
          ...this.props.carouselState,
          bigView: current
        })
    };
    this.props.setPage("");
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="slider-container-1">
          <Slider
            //ref={slider => (this.slider = slider)}
            ref={this.exampleRef}
            className="slider-container"
            {...settings}
            //style={{ width: "100vw", height: "56.17977vw" }}
          >
            {this.props.carouselMedia.preview_movies[0] ? (
              this.props.carouselMedia.preview_movies.slice(0, 4).map(media => {
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
          </Slider>
        </div>

        {/* Content  1130, 950 */}
        <div className="content">
          <div className="showcase-div">
            <div className="carousel-div">
              <Carousel
                type="tv"
                id_="One"
                mediaData={this.props.carouselMedia.preview_shows}
                carouselState={this.props.carouselState.slideOne}
                setCarouselState={this.setCarouselOne}
              />

              <div className="home-divider" />

              <Carousel
                type="movie"
                id_="Two"
                mediaData={this.props.carouselMedia.preview_movies}
                carouselState={this.props.carouselState.slideTwo}
                setCarouselState={this.setCarouselTwo}
              />
              <div className="home-divider" />

              <Carousel
                type="theaters"
                id_="Three"
                mediaData={this.props.carouselMedia.preview_in_theaters.slice(
                  2
                )}
                carouselState={this.props.carouselState.slideThree}
                setCarouselState={this.setCarouselThree}
              />
            </div>
          </div>
        </div>
        <div className="signature">
          Made with TMDB and React.js • Ratings from IMDB
        </div>
      </div>
    );
  }
}
