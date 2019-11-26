import React, { PureComponent } from "react";
import "../styles/actor-card.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default class ActorCard extends PureComponent {
  render(props) {
    console.log(this.props);
    return (
      <div className="actor-card-container">
        <div className="img-cover-div">
          <img
            className="actor-img"
            style={{
              width: "20vw",
              objectPosition: "0 -20.5px"
            }}
            src={`https://image.tmdb.org/t/p/w300_and_h450_face/${this.props.profile.profile_path}`}
            className="actor-pic"
          />
        </div>
        <div className="actor-details">
          <div style={{ textAlign: "center" }} className="actor-name">
            {this.props.profile.name || <Skeleton width="20vw" />}
          </div>
          <div style={{ textAlign: "center" }} className="actor-role">
            {this.props.profile.character || <Skeleton width="18vw" />}
          </div>
        </div>
      </div>
    );
  }
}
