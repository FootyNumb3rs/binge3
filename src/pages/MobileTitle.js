import React, { PureComponent } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Chip from "@material-ui/core/Chip";
import "../styles/mobile-title-page.css";
import StarIcon from "@material-ui/icons/Star";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ActorCard from "../components/ActorCard.js";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { browserHistory } from "react-router";

class MobileTitle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = props.state_;
    window.scrollTo(0, 0);
    //this.props.goBack = this.props.goBack.bind(this);
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
            <font style={{ color: "white" }}>
              {created_by.join(", ") || <Skeleton width="30%" />}
            </font>
          </div>

          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Episode Runtime
            {" - "}
            <font style={{ color: "white" }}>
              {episode_run_time + "min" || <Skeleton width="30%" />}
            </font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Networks
            {" - "}
            <font style={{ color: "white" }}>
              {networks.join(", ") || <Skeleton width="30%" />}
            </font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            First Air Date
            {" - "}
            <font style={{ color: "white" }}>
              {first_air.toDateString().slice(4) || <Skeleton width="30%" />}
            </font>
          </div>

          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Total Seasons
            {" - "}
            <font style={{ color: "white" }}>
              {`${num_seasons} Season(s), ${num_episodes} Episodes` || (
                <Skeleton width="30%" />
              )}
            </font>
          </div>
        </div>
      );
    }
  }

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
        <div className="mobile-vue-overview" style={{ paddingTop: "1.5px" }}>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Director
            {" - "}
            <font style={{ color: "white" }}>
              {dict.director.join(", ") || <Skeleton width="30%" />}
            </font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Cinematographer
            {" - "}
            <font style={{ color: "white" }}>
              {dict.cinematographer || "N/A"}
            </font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Writer(s)
            {" - "}
            <font style={{ color: "white" }}>
              {dict.writer.join(", ") || <Skeleton width="30%" />}
            </font>
          </div>

          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Runtime
            {" - "}
            <font style={{ color: "white" }}>
              {this.state.content.runtime + "min" || <Skeleton width="30%" />}
            </font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Budget
            {" - "}
            <font style={{ color: "white" }}>
              {"$" + this.formatCash(budget) || <Skeleton width="30%" />}
            </font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Revenue
            {" - "}
            <font style={{ color: "white" }}>
              {"$" + this.formatCash(revenue) || <Skeleton width="30%" />}
            </font>
          </div>
          <div style={{ padding: "2px 0px", lineHeight: 1.4 }}>
            Net{" - "}
            <font
              style={{ color: revenue - budget > 0 ? "#66BB6A" : "#F44336" }}
            >
              {(revenue - budget > 0 ? "+" : "-") +
                "$" +
                this.formatCash(Math.abs(revenue - budget)) || (
                <Skeleton width="30%" />
              )}
            </font>
          </div>
        </div>
      );
    }
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

  formatCash(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(0) + "k";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(0) + "m";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(0) + "b";
    if (n >= 1e12) return +(n / 1e12).toFixed(0) + "T";
  }

  getChip() {
    return (
      <Chip
        size="small"
        variant="outlined"
        label={this.state.content.vote_average}
        className="mobile-vue-rating-chip"
        style={{
          color: this.getRatingColor(this.state.content.vote_average)
        }}
        icon={
          <StarIcon
            style={{
              width: "12px",
              color: this.getRatingColor(this.state.content.vote_average)
            }}
          />
        }
      />
    );
  }

  render(props) {
    console.log(this.props);
    this.setState(this.props.state_);

    return (
      <div className="mobile-vue-container">
        <SkeletonTheme color="#202020" highlightColor="#444" borderRadius="0px">
          <div className="mobile-vue-cover-img-div">
            <div className="cover-details">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <div
                  style={{
                    backgroundColor: "transparent",
                    display: "inline-block"
                  }}
                  onClick={() => {
                    this.props.history.go(-1);
                  }}
                >
                  <ArrowBackIcon />
                </div>
              </Link>
            </div>
            <div className="mobile-vue-cover-img">
              {this.state.content.backdrop_path ? (
                <img
                  /* style={{ width: "100%", height: "auto" }} */
                  src={this.state.content.backdrop_path}
                  alt="lolz"
                />
              ) : (
                <Skeleton width="100%" height="100%" />
              )}
            </div>
          </div>

          <div className="mobile-vue-info-main-div">
            <div className="mobile-vue-title">
              <SkeletonTheme
                color="#202020"
                highlightColor="#444"
                borderRadius="0px"
              >
                {this.state.content.title ||
                  this.state.content.original_name || (
                    <Skeleton width="60%" height={20} />
                  )}
                {this.getChip()}
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
              <div>
                {this.state.content.overview || (
                  <Skeleton width={"90%"} height={13} count={3} />
                )}
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
                Cast
              </div>
              <div className="mobile-vue-cast">
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
              <div className="mobile-vue-cast">
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
                Trailer
              </div>
              <div
                className="video"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0
                }}
              >
                {this.state.videoContent ? (
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%"
                    }}
                    src={`https://www.youtube.com/embed/${this.state.videoContent.link}`}
                    frameBorder="0"
                  />
                ) : (
                  <Skeleton width="100%" height="200px" />
                )}
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
        </SkeletonTheme>
      </div>
    );
  }
}

export default withRouter(MobileTitle);
