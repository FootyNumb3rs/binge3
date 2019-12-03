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

/*
const useStyles = makeStyles(theme => ({
  log: { display: "flex", height: "100%" },

  button: {
    marginRight: theme.spacing(1.2),
    marginTop: 10,
    borderRadius: 20,
    height: "30px",
    fontSize: 12,
    textAlign: "left"
  }
}));

const classes = useStyles();
*/

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

  getReleaseDate = () => {
    //console.log(this.state);
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
        return `${this.state.content.release_date.slice(0, 4)}`;
      }
    }
  };

  getChip() {
    return (
      <Chip
        size="medium"
        variant="outlined"
        label={this.state.content.vote_average}
        className="title-rating-chip"
        style={{
          color: this.getRatingColor(this.state.content.vote_average)
        }}
        icon={
          <StarIcon
            style={{
              width: "15px",
              color: this.getRatingColor(this.state.content.vote_average)
            }}
          />
        }
      />
    );
  }

  formatCash(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + "k";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(0) + "m";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(0) + "b";
    if (n >= 1e12) return +(n / 1e12).toFixed(0) + "T";
  }

  getRunningTime = runtime => {
    var hours = runtime / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "hr " + rminutes + "min";
  };

  displayMovieDetails() {
    if (this.state.credits.crew) {
      const budget = this.state.content.budget;
      const revenue = this.state.content.revenue;
      const dict = { director: [], writer: [], cinematographer: [] };
      this.state.credits.crew.map(d => {
        switch (d.job) {
          case "Director of Photography":
            dict.cinematographer = d.name;

          case "Director":
            if (dict.director) {
              dict.director.push(d.name);
            } else {
              dict.director = [d.name];
            }

          case "Original Music Composer":
            if (dict.composer) {
              dict.composer.push(d.name);
            } else {
              dict.composer = [d.name];
            }

          case "Screenplay":
            if (d.department == "Screenplay") {
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
        <div className="info-left">
          <div>
            <div className="info-header">Crew</div>

            <div className="info-data" style={{ lineHeight: "25px" }}>
              {"Director /" + " " + dict.director[0] || (
                <Skeleton duation={1} />
              )}
            </div>
            <div className="info-data" style={{ lineHeight: "25px" }}>
              {"Writer /" + " " + dict.writer.join(", ") || (
                <Skeleton duation={1} />
              )}
            </div>
          </div>

          <div>
            <div className="info-header">Runtime</div>
            <div className="info-data">
              {this.getRunningTime(this.state.content.runtime) || (
                <Skeleton duation={1} width="40%" />
              )}
            </div>
          </div>
          <div>
            <div className="info-header">Budget</div>
            <div className="info-data">
              {"$" + this.formatCash(budget) || (
                <Skeleton duation={1} width="40%" />
              )}
            </div>
          </div>
          <div>
            <div className="info-header">Revenue</div>
            <div className="info-data">
              {"$" + this.formatCash(revenue) || (
                <Skeleton duation={1} width="40%" />
              )}
            </div>
          </div>
        </div>
      );
    }
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
        <div className="info-left">
          <div>
            <div className="info-header">Created By</div>
            {created_by.map(d => {
              console.log(d);
              return (
                <div className="info-data" style={{ lineHeight: "25px" }}>
                  {d || <Skeleton width="80%" />}
                </div>
              );
            })}
          </div>

          <div>
            <div className="info-header">Episode Runtime</div>
            <div className="info-data" style={{ lineHeight: "25px" }}>
              {episode_run_time + "min" || <Skeleton width="50%" />}
            </div>
          </div>

          <div>
            <div className="info-header">Networks</div>
            <div className="info-data" style={{ lineHeight: "25px" }}>
              {networks.join(", ") || <Skeleton width="50%" />}
            </div>
          </div>

          <div>
            <div className="info-header">Total Seasons </div>
            <div className="info-data" style={{ lineHeight: "25px" }}>
              {`${num_seasons} Season(s), ${num_episodes} Episodes` || (
                <Skeleton width="50%" />
              )}
            </div>
          </div>
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
              <div className="cover-details"></div>
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
            <div
              style={{
                paddingTop: "10px",
                paddingBottom: "55px",
                maxWidth: "1280px",
                width: "100%"
              }}
            >
              <div
                className="info-main-div"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div>
                  <div className="title">
                    {this.props.match.params.media_type == "movie"
                      ? this.state.content.original_title
                      : this.state.content.original_name}
                    {this.getChip()}
                  </div>
                  <div className="title-genres">
                    {this.getReleaseDate() || (
                      <Skeleton width="80px" height={15} />
                    )}{" "}
                    •{" "}
                    {this.state.content.genres ? (
                      this.state.content.genres
                        //.slice(0, 2)
                        .map(genre => genre.name)
                        .join(", ")
                        .toUpperCase()
                    ) : (
                      <Skeleton width="160px" height={15} />
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                    marginLeft: 0,
                    marginRight: 0
                  }}
                >
                  {this.state.videoContent.link &&
                  this.state.videoContent.site == "YouTube" ? (
                    <Fab
                      //variant="outlined"
                      color="secondary"
                      //className={classes.button}
                      href={`https://www.youtube.com/watch?v=${this.state.videoContent.link}`}
                      target="_blank"
                      style={{
                        marginRight: "16px"
                        /*
                      borderRadius: 30,
                      height: "45px",
                      fontSize: 15,
                      textAlign: "left"

                       WATCH{" "}
                    {this.props.match.params.media_type == "tv"
                      ? "CLIP"
                      : "TRAILER"}
                      */
                        //backgroundColor: "#3f51b5"
                      }}
                    >
                      <PlayArrowIcon />
                    </Fab>
                  ) : (
                    <div />
                  )}

                  {this.state.content.homepage ? (
                    <Fab
                      //variant="outlined"
                      color="primary"
                      //className={classes.button}
                      aria-label="home"
                      href={this.state.content.homepage}
                      target="_blank"
                      style={
                        {
                          /*
                      marginRight: "16px",
                      borderRadius: 30,
                      height: "45px",
                      fontSize: 15,
                      textAlign: "left"
                      */
                          //
                        }
                      }
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
                    <div className="info-header">Overview</div>

                    <div className="info-data">
                      <SkeletonTheme
                        color="#202020"
                        highlightColor="#444"
                        borderRadius="0px"
                        width="1280px"
                      >
                        {this.state.content.overview || (
                          <Skeleton count={3} width="90%" />
                        )}
                      </SkeletonTheme>
                    </div>
                  </div>
                  <div className="section">
                    <div className="info-header">Cast</div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        maxWidth: "100%",
                        justifyContent: "flex-start",
                        marginBottom: "15px"
                      }}
                    >
                      {this.state.credits.cast
                        ? this.state.credits.cast.slice(0, 6).map(credit => {
                            return (
                              <div key={1}>
                                <DesktopActorCard profile={credit} />
                              </div>
                            );
                          })
                        : "s"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }
}
