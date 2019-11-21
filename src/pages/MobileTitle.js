import React, { PureComponent } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getById } from "../tools/pullData.js";
import Chip from "@material-ui/core/Chip";
import "../styles/mobile-title-page.css";
import StarIcon from "@material-ui/icons/Star";

export default class MobileTitle extends PureComponent {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { content: {}, bannerInfo: {} };

    const chip = {
      marginRight: 6.5,
      marginBottom: 1.5,
      backgroundColor: "#212121",
      color: "#bdbdbd",
      fontSize: 11.3,
      fontWeight: 500
    };

    //this.getPromise(props.match.params.id, props.match.params.media_type);
  }

  render(props) {
    this.setState({
      content: this.props.content,
      bannerInfo: this.props.bannerInfo
    });
    console.log(this.props);
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
            {this.state.bannerInfo.title}{" "}
            <Chip
              size="small"
              variant="outlined"
              label={this.state.content.vote_average}
              icon={<StarIcon style={{ width: "12px", color: "lightgreen" }} />}
              style={{
                marginLeft: 5,
                marginBottom: 1.5,
                backgroundColor: "#212121",
                color: "lightgreen",
                borderColor: "#212121",
                fontSize: 12,
                fontWeight: 500
              }}
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
          <div
            style={{
              height: ".5px",
              maxWidth: "100vw",
              background: "white",
              opacity: 0.2,
              marginTop: "30px",
              //marginBottom: "30px",
              marginLeft: "0px",
              marginRight: "0px"
              //marginRight: "20px"
            }}
          />
          <div></div>
        </div>
      </div>
    );
  }
}

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
