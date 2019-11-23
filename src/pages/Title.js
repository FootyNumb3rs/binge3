import React, { PureComponent } from "react";
import "../styles/title-page.css";
import { getCredits } from "../tools/pullData.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { getById } from "../tools/pullData.js";
import Chip from "@material-ui/core/Chip";
import MobileTitle from "./MobileTitle.js";

export default class Title extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { content: {}, bannerInfo: {}, credits: {} };
    this.getPromise(props.match.params.id, props.match.params.media_type);
  }

  // How to
  getPromise(id_, media_type) {
    getById({}, id_, media_type).then(data => {
      this.setState({
        content: data[0]
      });

      getCredits(id_, media_type).then(data => {
        // data[0] are all the credits

        this.setState({ credits: data[0] });
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
            </div>
            <div className="info-right">
              <div>
                <div className="info-header">PLOT</div>
                <div className="divider" />
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
