import React, { PureComponent } from "react";
import "../styles/title-page.css";
import { getCredits, getDialogContent } from "../tools/pullData.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getById } from "../tools/pullData.js";
import MobileTitle from "./MobileTitle.js";
import ActorCard from "../components/ActorCard.js";
import DesktopActorCard from "../components/DesktopActorCard.js";
import StarIcon from "@material-ui/icons/Star";
import HomeIcon from "@material-ui/icons/Home";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ErrorBoundary from "../pages/ErrorBoundary";

export default class Title extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: {},
      bannerInfo: {},
      credits: {
        cast: ["s", "s", "s", "s", "s", "s"],
        crew: ["s", "s", "s", "s", "s", "s"]
      },
      videoContent: {}
    };
    this.getPromise(props.match.params.id, props.match.params.media_type);
    props.setBar_(false);
  }

  // How to
  getPromise(id_, media_type) {
    getById({}, id_, media_type).then(data => {
      this.setState({ content: data[0] });
    });

    getCredits(id_, media_type).then(data => {
      this.setState({ credits: data[0] });
    });

    getDialogContent(id_, media_type).then(data => {
      console.log(data);
      this.setState({ videoContent: data[0] });
    });

    this.setState({
      bannerInfo: {
        title:
          this.props.match.params.media_type == "tv"
            ? this.state.content.original_name
            : this.state.content.original_title
      }
    });
  }

  getRatingColor(rating) {
    if (rating < 6) {
      return "#F44336";
    } else if (rating < 7) {
      return "#FB8C00";
    } else if (rating < 7.5) {
      return "#FFEE58";
    } else {
      return "#66BB6A";
    }
  }

  getTrailer() {
    if (this.state.videoContent) {
      if (this.state.videoContent.link) {
        return (
          <Fab
            color="secondary"
            href={`https://www.youtube.com/watch?v=${this.state.videoContent.link}`}
            target="_blank"
            style={{
              marginRight: "16px"
            }}
          >
            <PlayArrowIcon />
          </Fab>
        );
      } else {
        return <div />;
      }
      return <div />;
    }
  }

  getReleaseDate = () => {
    if (this.state.content.id) {
      if (this.props.match.params.media_type == "tv") {
        if (this.state.content.status == "Returning Series") {
          return `${this.state.content.first_air_date.slice(0, 4)}-PRESENT`;
        } else {
          return `${this.state.content.first_air_date.slice(
            0,
            4
          )}-${this.state.content.last_air_date.slice(0, 4)}`;
        }
      } else {
        return `${this.state.content.release_date}`;
      }
    }
  };

  getChip() {
    if (this.state.content.vote_average) {
      return (
        <Chip
          size="medium"
          variant="outlined"
          label={
            this.state.content.vote_average
              ? this.state.content.vote_average.toFixed(1)
              : ""
          }
          className="title-rating-chip"
          style={{
            color: this.getRatingColor(this.state.content.vote_average),
            //borderRadius: "100%",
            backgroundColor: "#1a1a1a",
            fontSize: 15
          }}
          icon={
            <StarIcon
              style={{
                width: "16px",
                color: this.getRatingColor(this.state.content.vote_average)
              }}
            />
          }
        />
      );
    }
  }

  getGenreChip(genre) {
    return (
      <Chip
        size="small"
        variant="outlined"
        label={genre}
        style={{
          backgroundColor: "#1a1a1a",
          borderColor: "#1a1a1a",
          color: "gray",
          marginRight: "9px",
          borderRadius: "5px",
          fontWeight: 400,
          fontSize: 15,
          marginTop: "1px"
          //textTransform: "uppercase"
        }}
        className="title-rating-chip"
      />
    );
  }

  formatCash(n) {
    if (!n) {
      return undefined;
    }
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return "$" + (n / 1e3).toFixed(0).toString() + "k";
    if (n >= 1e6 && n < 1e9) return "$" + (n / 1e6).toFixed(0).toString() + "m";
    if (n >= 1e9 && n < 1e12)
      return "$" + (n / 1e9).toFixed(0).toString() + "b";
    if (n >= 1e12) return "$" + (n / 1e12).toFixed(0).toString() + "T";
  }

  getMetadata(header, data, any) {
    return (
      <div style={{ marginBottom: "15px" }}>
        <div className="info-header" style={{ lineHeight: 1.2 }}>
          {any ? header : <Skeleton width="150px" />}
          <font
            style={{
              fontWeight: 350,
              fontSize: 6,
              opacity: 0,
              color: "gray",
              paddingBottom: "10px"
            }}
          >
            {" • "}
          </font>
          <font className="info-data" style={{ lineHeight: 1.45 }}>
            {" "}
            {any ? data : ""}{" "}
          </font>
        </div>
      </div>
    );
  }

  getRunningTime = runtime => {
    if (!runtime) {
      return undefined;
    }
    var hours = runtime / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "hr " + rminutes + "min";
  };

  displayMovieDetails() {
    if (this.state.credits.crew) {
      const dict = { director: [], writer: [], cinematographer: [] };

      this.state.credits.crew.map(d => {
        switch (d.job) {
          case "Director of Photography":
            dict.cinematographer = d.name;

          case "Director":
            if (d.department == "Directing") {
              if (dict.director) {
                dict.director.push(d.name);
              } else {
                dict.director = [d.name];
              }
            }

          case "Original Music Composer":
            if (dict.composer) {
              dict.composer.push(d.name);
            } else {
              dict.composer = [d.name];
            }

          case "Screenplay":
            console.log(d.name);
            if (d.department == "Writing") {
              if (dict.writer && !dict.writer.includes(d.name)) {
                dict.writer.push(d.name);
              } else {
                dict.writer = [d.name];
              }
            }

          case "Writer":
            console.log(d.name);
            if (d.department == "Writing") {
              if (dict.writer && !dict.writer.includes(d.name)) {
                dict.writer.push(d.name);
              } else {
                dict.writer = [d.name];
              }
            }

          case "Editor":
            if (dict.editor) {
              dict.editor.push(d.name);
            } else {
              dict.editor = [d.name];
            }
        }
      });

      var released = new Date(this.getReleaseDate());
      released = released.toDateString();
      released = `${released.slice(4, 7)} ${released.slice(11, 15)}`;
      const runtime = this.getRunningTime(this.state.content.runtime);
      const budget = this.formatCash(this.state.content.budget);
      const revenue = this.formatCash(this.state.content.revenue);
      const director = dict.director.join(", ");
      const writer = dict.writer.join(", ");
      const any = director || writer || runtime || budget || revenue;

      return (
        <div className="info-left">
          {this.getMetadata("Release", released, any)}
          {this.getMetadata("Director", director, any)}
          {this.getMetadata("Writer", writer, any)}
          {this.getMetadata("Runtime", runtime, any)}
          {this.getMetadata("Budget", budget, any)}
          {this.getMetadata("Revenue", revenue, any)}
        </div>
      );
    }
  }

  displayShowDetails() {
    if (this.state.content.created_by) {
      const created_by = this.state.content.created_by
        .map(d => {
          return d.name;
        })
        .join(", ");
      const networks = this.state.content.networks
        .map(d => {
          return d.name;
        })
        .join(", ");
      var first_air = new Date(this.state.content.first_air_date);
      first_air = first_air.toDateString();
      first_air = `${first_air.slice(4, 7)} ${first_air.slice(11, 15)}`;
      const num_seasons = this.state.content.number_of_seasons;
      const num_episodes = this.state.content.number_of_episodes;
      const length = `${num_seasons} ${
        num_seasons > 1 ? "Seasons" : "Season"
      }, ${num_episodes} Episodes`;

      const status =
        this.state.content.status == "Returning Series" ? "Ongoing" : "Ended";

      var any =
        created_by ||
        networks ||
        first_air ||
        num_seasons ||
        num_episodes ||
        length ||
        status;

      return (
        <div className="info-left">
          {this.getMetadata("Creator", created_by, any)}
          {this.getMetadata("Networks", networks, any)}
          {this.getMetadata("Debut", first_air, any)}
          {this.getMetadata("Length", length, any)}
          {this.getMetadata("Status", status, any)}
        </div>
      );
    }
  }

  render(props) {
    console.log(this.state.content);

    return (
      <SkeletonTheme color="#202020" highlightColor="#444" borderRadius="0px">
        <div>
          <div>
            <MobileTitle
              state_={this.state}
              media_type={this.props.match.params.media_type}
            />
          </div>

          <div className="title-container">
            <div className="cover-img-div">
              <div className="cover-details">
                <div
                  className="back-button"
                  onClick={() => {
                    this.props.history.go(-1);
                  }}
                >
                  <KeyboardArrowLeft
                    style={{ width: "35px", height: "35px" }}
                  />
                </div>
              </div>
              {this.state.content.backdrop_path ? (
                <img
                  className="cover-img"
                  src={this.state.content.backdrop_path}
                  alt=""
                />
              ) : (
                <Skeleton height="450px" width="100vw" />
              )}
            </div>

            <div className="info-main-container">
              <div
                className="info-main-div"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div>
                  <div className="title">
                    {this.props.match.params.media_type == "movie"
                      ? this.state.content.original_title || (
                          <Skeleton width="200px" height="25px" />
                        )
                      : this.state.content.original_name || (
                          <Skeleton width="200px" height="25px" />
                        )}
                    {this.getChip()}
                  </div>
                  <div className="title-genres" style={{ fontSize: 12 }}>
                    {this.state.content.genres
                      ? this.state.content.genres.map(genre => {
                          return this.getGenreChip(genre.name);
                        })
                      : ""}
                  </div>
                </div>

                <div className="video-div">
                  {this.getTrailer()}

                  {this.state.content.homepage ? (
                    <Fab
                      //color="primary"
                      aria-label="home"
                      href={this.state.content.homepage}
                      target="_blank"
                    >
                      <HomeIcon />
                    </Fab>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div className="info-main-div">
                {this.props.match.params.media_type == "movie"
                  ? this.displayMovieDetails()
                  : this.displayShowDetails()}

                <div className="info-right">
                  <div className="section">
                    <div
                      className="info-header"
                      /*style={{ marginBottom: "10px" }}*/
                    >
                      {this.state.content.overview ? "Overview" : ""}
                    </div>

                    <div className="info-data">
                      <SkeletonTheme
                        color="#202020"
                        highlightColor="#444"
                        borderRadius="0px"
                        width="1280px"
                      >
                        {
                          <font /*style={{ lineHeight: 1.3 }}*/>
                            {this.state.content.overview || (
                              <Skeleton count={3} width="90%" />
                            )}
                          </font>
                        }
                      </SkeletonTheme>
                    </div>
                  </div>
                  <div className="section">
                    <div className="info-header">
                      {this.state.content.overview ? "Cast" : ""}
                    </div>
                    <div className="cast-div">
                      {this.state.credits.cast
                        ? this.state.credits.cast
                            .slice(0, 6)
                            .map((credit, i) => {
                              return (
                                //<div key={i}>
                                <DesktopActorCard profile={credit} />
                                //</div>
                              );
                            })
                        : "s"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }
}

/*
                  {this.state.videoContent.link &&
                  this.state.videoContent.site == "YouTube" ? (
                    <Fab
                      color="secondary"
                      href={`https://www.youtube.com/watch?v=${this.state.videoContent.link}`}
                      target="_blank"
                      style={{
                        marginRight: "16px"
                      }}
                    >
                      <PlayArrowIcon />
                    </Fab>
                  ) : (
                    <div />
                  )} */
