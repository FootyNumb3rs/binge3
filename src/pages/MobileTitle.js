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

  displayDetails() {
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
            {this.state.bannerInfo.title}
            <Chip
              size="small"
              variant="outlined"
              label={this.state.content.vote_average}
              className="mobile-vue-rating-chip"
              icon={<StarIcon style={{ width: "12px", color: "lightgreen" }} />}
            />
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
            {this.displayDetails()}
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
