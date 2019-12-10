import React, { PureComponent } from "react";
import "../styles/desktop-actor-card.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default class DesktopActorCard extends PureComponent {
  render(props) {
    //console.log(this.props);
    return (
      <div className="actor-card-container">
        <div className="img-cover-div">
          {this.props.profile.profile_path ? (
            <img
              alt="actor"
              style={{
                // Doesnt' work on CSS for some reason
                width: "110px",
                objectFit: "cover",
                objectPosition: "0 -20.5px"
              }}
              src={`https://image.tmdb.org/t/p/w300_and_h450_face/${this.props.profile.profile_path}`}
              className="actor-pic"
            />
          ) : (
            <Skeleton height="110px" width="110px" circle={true} />
          )}
        </div>
        <div className="actor-details">
          <div style={{ textAlign: "center" }} className="actor-name">
            {this.props.profile.name || <Skeleton width="100px" />}
          </div>
          <div style={{ textAlign: "center" }} className="actor-role">
            {/*this.props.profile.character || <Skeleton width="18vw" />*/}
          </div>
        </div>
      </div>
    );
  }
}
