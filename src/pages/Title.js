import React, { PureComponent } from "react";
import "../styles/title-page.css";
import { getCredits, getDialogContent } from "../tools/pullData.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getById } from "../tools/pullData.js";
import Chip from "@material-ui/core/Chip";
import MobileTitle from "./MobileTitle.js";
import ActorCard from "../components/ActorCard.js";

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
            <div className="info-header">Director</div>

            <div className="info-data">
              <SkeletonTheme
                color="#202020"
                highlightColor="#444"
                borderRadius="0px"
              >
                {dict.director || <Skeleton duation={1} />}
              </SkeletonTheme>
            </div>
          </div>
          <div>
            <div className="info-header">Cinematographer</div>

            <div className="info-data">{dict.cinematographer} </div>
          </div>
          <div>
            <div className="info-header">Writer(s)</div>
            <div className="info-data">{dict.writer.join(", ")}</div>
          </div>
          <div>
            <div className="info-header">Runtime</div>
            <div className="info-data">{this.state.content.runtime}min</div>
          </div>
          <div>
            <div className="info-header">Budget</div>
            <div className="info-data">{this.state.content.budget}</div>
          </div>
          <div>
            <div className="info-header">Revenue</div>
            <div className="info-data">{this.state.content.revenue}</div>
          </div>
        </div>
      );
    }
  }

  render(props) {
    //console.log(this.state.content.backdrop_path);
    return (
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
              <div className="title">{this.state.bannerInfo.title}</div>
              <div className="genres">
                {this.state.content.genres
                  ? this.state.content.genres
                      .map(genre => genre.name)
                      .join(" / ")
                  : "s"}
              </div>
              <div className="tagline">{this.state.content.tagline}</div>
            </div>

            <img
              className="cover-img"
              src={this.state.content.backdrop_path}
              alt=""
            />
          </div>
          <div className="info-main-div">
            {this.props.match.params.media_type == "movie"
              ? this.displayMovieDetails()
              : ""}
            {/*
            <div className="info-left">
              <div>
                <div className="info-header">RELEASE DATE</div>
                <div className="divider" />
                <div className="info-data">
                  <SkeletonTheme
                    color="#202020"
                    highlightColor="#444"
                    borderRadius="0px"
                  >
                    {this.state.content.original_name || (
                      <Skeleton duation={1} />
                    )}
                  </SkeletonTheme>
                </div>
              </div>
              <div>
                <div className="info-header">GENRES</div>
                <div className="divider" />
                <div className="info-data">Action, Sci-Fi </div>
              </div>
              <div>
                <div className="info-header">BUDGET</div>
                <div className="divider" />
                <div className="info-data">$150M</div>
              </div>
                    </div> */}
            <div className="info-right">
              <div>
                <div className="info-header">Plot</div>

                <div className="info-data ">
                  <SkeletonTheme
                    color="#202020"
                    highlightColor="#444"
                    borderRadius="0px"
                    width="1280px"
                  >
                    {this.state.content.overview || <Skeleton count={4} />}
                  </SkeletonTheme>
                </div>
              </div>
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
                    ? this.state.credits.cast.slice(0, 5).map(credit => {
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
                    ? this.state.credits.cast.slice(5, 10).map(credit => {
                        return (
                          <div key={1}>
                            <ActorCard profile={credit} />
                          </div>
                        );
                      })
                    : "s"}
                </div>
              </div>
            </div>
            {this.props.match.params.media_type == "movie"
              ? this.displayMovieDetails()
              : ""}
          </div>
        </div>
      </div>
    );
  }
}
