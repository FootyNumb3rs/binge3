import React, { PureComponent } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Chip from "@material-ui/core/Chip";
import "../styles/mobile-title-page.css";
import StarIcon from "@material-ui/icons/Star";
import ActorCard from "../components/ActorCard.js";

export default class MobileTitle extends PureComponent {
  constructor(props) {
    //console.log(props);
    super(props);
    this.state = props.state_;
    //this.getPromise(props.match.params.id, props.match.params.media_type);
  }

  displayShowDetails() {
    if (this.state.content.created_by) {
      const created_by = this.state.content.created_by.map(d => {
        return d.name;
      });

      const episode_run_time = this.state.content.episode_run_time[0];

      const num_seasons = this.state.content.number_of_seasons;
      const num_episodes = this.state.content.number_of_episodes;
      const first_air = new Date(this.state.content.first_air_date);
      const networks = this.state.content.networks.map(d => {
        return d.name;
      });

      return (
        <div className="mobile-vue-overview" style={{ paddingTop: "1.5px" }}>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Created By
            {" - "}
            <font style={{ color: "white" }}>{created_by.join(", ")}</font>
          </div>

          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Episode Runtime
            {" - "}
            <font style={{ color: "white" }}>{episode_run_time}min</font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Networks
            {" - "}
            <font style={{ color: "white" }}>{networks.join(", ")}</font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            First Air Date
            {" - "}
            <font style={{ color: "white" }}>
              {first_air.toDateString().slice(4)}
            </font>
          </div>

          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Total Seasons
            {" - "}
            <font style={{ color: "white" }}>
              {num_seasons} Season(s ), {num_episodes} Episodes{" "}
            </font>
          </div>
        </div>
      );
    }
  }

  displayMovieDetails() {
    if (this.state.credits.crew) {
      const dict = {};
      this.state.credits.crew.map(d => {
        switch (d.job) {
          case "Director of Photography":
            dict.cinematographer = d.name;

          case "Director":
            if (!dict.director) {
              dict.director = d.name;
            }

          case "Original Music Composer":
            if (dict.composer) {
              dict.composer.push(d.name);
            } else {
              dict.composer = [d.name];
            }

          case "Screenplay":
            if (dict.writer) {
              dict.writer.push(d.name);
            } else {
              dict.writer = [d.name];
            }

          case "Editor":
            if (dict.editor) {
              dict.editor.push(d.name);
            } else {
              dict.editor = [d.name];
            }
        }
      });

      return (
        <div className="mobile-vue-overview" style={{ paddingTop: "1.5px" }}>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Director
            {" - "}
            <font style={{ color: "white" }}>{dict.director}</font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Cinematographer
            {" - "}
            <font style={{ color: "white" }}>{dict.cinematographer}</font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Writer(s)
            {" - "}
            <font style={{ color: "white" }}>{dict.writer.join(", ")}</font>
          </div>
        </div>
      );
    }
  }

  render(props) {
    console.log(this.props);
    this.setState(this.props.state_);

    return (
      <div className="mobile-vue-container">
        <div className="mobile-vue-cover-img-div">
          <img
            className="mobile-vue-cover-img"
            src={this.state.content.backdrop_path}
            alt=""
          />
        </div>
        <div className="mobile-vue-info-main-div">
          <div className="mobile-vue-title">
            <SkeletonTheme
              color="#202020"
              highlightColor="#444"
              borderRadius="0px"
              //width={10}
            >
              {this.state.bannerInfo.title}

              <Chip
                size="small"
                variant="outlined"
                label={this.state.content.vote_average}
                className="mobile-vue-rating-chip"
                icon={
                  <StarIcon style={{ width: "12px", color: "lightgreen" }} />
                }
              />
            </SkeletonTheme>
          </div>

          <div className="mobile-vue-genres">
            <div>
              {"2019 • "}
              {this.state.content.genres
                ? this.state.content.genres
                    .map(genre => genre.name)
                    .join(", ")
                    .toUpperCase()
                : "s"}
            </div>
          </div>

          <div className="mobile-vue-overview">
            <div className="ov-header">Overview</div>

            <div>{this.state.content.overview}</div>
          </div>
          <div className="title-divider" />

          <div>
            <div
              className="ov-header"
              style={{
                fontWeight: 700,
                fontColor: "gray"
              }}
            >
              Cast
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                maxWidth: "100%",
                justifyContent: "space-between",
                marginBottom: "15px"
              }}
            >
              {this.state.credits.cast
                ? this.state.credits.cast.slice(0, 3).map(credit => {
                    return (
                      <div key={1}>
                        <ActorCard profile={credit} />
                      </div>
                    );
                  })
                : "s"}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                maxWidth: "100%",
                justifyContent: "space-between",
                margin: "5px 0px"
              }}
            >
              {this.state.credits.cast
                ? this.state.credits.cast.slice(3, 6).map(credit => {
                    return (
                      <div key={1}>
                        <ActorCard profile={credit} />
                      </div>
                    );
                  })
                : "s"}
            </div>
          </div>
          <div className="title-divider" />
          <div>
            <div
              className="ov-header"
              style={{
                fontWeight: 700,
                fontColor: "gray"
              }}
            >
              Information
            </div>

            {this.props.media_type == "movie"
              ? this.displayMovieDetails()
              : this.displayShowDetails()}
          </div>
        </div>
      </div>
    );
  }
}

/*

  {this.state.credits.map(credit => {
            return (
              <div key={1}>
                <ActorCard profile={credit} />
              </div>
            );
          })}



*/

// How to
/*
  getPromise(id_, media_type) {
    getById({}, id_, media_type).then(data => {
      console.log(data[0]);
      this.setState({
        content: data[0]
      });

      this.setState({
        bannerInfo: {
          title:
            this.props.match.params.media_type == "tv"
              ? this.state.content.original_name
              : this.state.content.original_title
        }
      });
    });
  }
  */

{
  /*
          <div className="mobile-vue-title">{this.state.bannerInfo.title}</div>
          <div className="mobile-vue-genres">
            {this.state.content.genres
              ? this.state.content.genres.map(genre => genre.name).join(" / ")
              : "s"}
          </div>
            */
}

/*

<div className="mobile-vue-details">
            <div style={{ flexGrow: 1 }}>
              <div>Director: </div>
            </div>
            <div style={{ flexGrow: 1 }}>
              <div>Director: </div>
            </div>
          </div>

*/

/*

<Chip
                  size="small"
                  variant="outlined"
                  label={"FANTASY"}
                  style={{
                    marginRight: 6,
                    marginBottom: 1.5,
                    //backgroundColor: "#212121",
                    color: "#bdbdbd",
                    borderColor: "gray",
                    fontSize: 12,
                    fontWeight: 300
                  }}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  label={"DRAMA"}
                  style={{
                    marginRight: 6,
                    marginBottom: 1.5,
                    //backgroundColor: "#212121",
                    color: "#bdbdbd",
                    borderColor: "gray",
                    fontSize: 12,
                    fontWeight: 300
                  }}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  label={"ACTION"}
                  style={{
                    marginRight: 6,
                    marginBottom: 1.5,
                    //backgroundColor: "#212121",
                    color: "#bdbdbd",
                    borderColor: "gray",
                    fontSize: 11,
                    fontWeight: 200
                  }}
                />




*/
