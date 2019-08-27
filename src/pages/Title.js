import React, { Component, PureComponent } from "react";

export default class Title extends PureComponent {
  render(props) {
    return (
      <div style={{ backgroundColor: "white", fontColor: "black" }}>
        {this.props.location.state.title}
      </div>
    );
  }
}
