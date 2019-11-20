import React, { PureComponent } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Carousel from "../components/Carousel";
import "../styles/main-app.css";
import { getTrending, getGenres } from "../tools/pullData";
import Slider from "react-slick";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { preview_movies: [], preview_shows: [] };

    getGenres().then(data => {
      var genres_ = Object.assign(data[0], data[1]);
      this.setState({ genres: genres_ });

      this.previewMovies();
      this.previewShows();
    });
  }

  previewMovies = () => {
    getTrending(this.state.genres, "movie").then(data => {
      var all_data = [];
      data.forEach(d => {
        all_data.push(...d);
      });
      this.setState({ preview_movies: all_data });
    });
  };

  previewShows = () => {
    getTrending(this.state.genres, "tv").then(data => {
      var all_data = [];
      data.forEach(d => {
        all_data.push(...d);
      });
      this.setState({ preview_shows: all_data });
    });
  };

  render(props) {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div style={{ overflow: "hidden" }}>
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://image.tmdb.org/t/p/original//P7QwQE8HJaB5bIIACyRdXVV7gO.jpg"
              img
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://image.tmdb.org/t/p/original//nRXO2SnOA75OsWhNhXstHB8ZmI3.jpg"
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
            <div>
              <Carousel type="tv" mediaData={this.state.preview_shows} />
              <div
                style={{
                  height: "1px",
                  maxWidth: "100vw",
                  background: "white",
                  opacity: 0.2,
                  marginTop: "20px",
                  marginBottom: "30px",
                  marginLeft: "30px",
                  marginRight: "0px"
                  //marginRight: "20px"
                }}
              />
              <Carousel type="movie" mediaData={this.state.preview_movies} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
