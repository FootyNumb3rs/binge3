import React, { PureComponent } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getById } from "../tools/pullData.js";
import Chip from "@material-ui/core/Chip";
import "../styles/mobile-title-page.css";

export default class MobileTitle extends PureComponent {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { content: {}, bannerInfo: {} };

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
          <div className="mobile-vue-title">{this.state.bannerInfo.title}</div>
          <div className="mobile-vue-genres">
            <div>
              {this.state.content.genres
                ? this.state.content.genres.map(genre => genre.name).join(", ")
                : "s"}
            </div>
          </div>

          <div className="mobile-vue-overview">
            {this.state.content.overview}
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
