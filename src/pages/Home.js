import React, { PureComponent } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import PreviewPanel from "../components/Carousel";
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
      dots: true,
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
              src="https://image.tmdb.org/t/p/original//fudEG1VUWuOqleXv6NwCExK0VLy.jpg"
              img
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://image.tmdb.org/t/p/original//fudEG1VUWuOqleXv6NwCExK0VLy.jpg"
              img
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://image.tmdb.org/t/p/original//fudEG1VUWuOqleXv6NwCExK0VLy.jpg"
              img
            />
          </div>
        </Slider>

        {/* Content */}
        <div className="content">
          <div className="showcase-div">
            <div>
              <PreviewPanel type="tv" mediaData={this.state.preview_shows} />

              <PreviewPanel
                type="movie"
                mediaData={this.state.preview_movies}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
