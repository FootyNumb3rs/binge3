import React, { Component, PureComponent } from "react";

export default class Search extends PureComponent {
  render(props) {
    return (
      <div style={{ backgroundColor: "white", fontColor: "black" }}>
        {console.log(this.props.search)}
      </div>
    );
  }
}
