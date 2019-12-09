import React, { PureComponent } from "react";
import "../styles/actor-card.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default class ActorCard extends PureComponent {
  render(props) {
    //console.log(this.props);
    return (
      <div className="mobile-actor-card-container">
        <div className="mobile-img-cover-div">
          {this.props.profile.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_face/${this.props.profile.profile_path}`}
            />
          ) : (
            <Skeleton height="100%" width="23vw" circle={true} />
          )}
        </div>
        <div>
          <div className="mobile-actor-name">
            {this.props.profile.name || <Skeleton width="20vw" />}
          </div>
          {/*
          <div style={{ textAlign: "center" }} className="actor-role">
            this.props.profile.character || <Skeleton width="18vw" />
          </div>
          */}
        </div>
      </div>
    );
  }
}
