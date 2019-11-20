import React, { useState, PureComponent } from "react";
import { getTrending, getGenres, getSearch } from "../tools/pullData.js";
import MediaCard from "../components/MediaCard.js";
import MobileMediaCard from "../components/MobileMediaCard.js";
import "../styles/browse.css";

import { Icon, Pagination } from "semantic-ui-react";

export default class Browse extends PureComponent {
  // Constructor
  constructor(props) {
    super(props);
    this.state = { content_list: [], genres: {} };

    getGenres().then(data => {
      var genres_ = Object.assign(data[0], data[1]);
      this.setState({ genres: genres_ });

      // If there is a search query
      if (props.match.params.search_query) {
        this.displaySearch(props.match.params.search_query);
        // If it's only displaying trending
      } else {
        this.displayTrending(props.match.params.media_type);
      }
    });
  }

  // Get Trending
  displayTrending = media_type => {
    getTrending(this.state.genres, media_type).then(data => {
      var all_data = [];
      data.forEach(d => {
        all_data.push(...d);
      });
      this.setState({ content_list: all_data });
      window.scrollTo(0, 0);
    });
  };

  // Get Search
  displaySearch = search_query => {
    getSearch(this.state.genres, search_query).then(data => {
      var all_data = [];
      data.forEach(d => {
        all_data.push(...d);
      });
      this.setState({ content_list: all_data });
      window.scrollTo(0, 0);
    });
  };

  // If only props change
  componentDidUpdate(prevProps) {
    if (this.props.match.params.search_query) {
      prevProps.match.params.search_query !==
      this.props.match.params.search_query
        ? this.displaySearch(this.props.match.params.search_query)
        : console.log("yo");
    } else {
      if (
        prevProps.match.params.media_type !== this.props.match.params.media_type
      ) {
        this.displayTrending(this.props.match.params.media_type);
      }
    }
  }

  render(props) {
    return (
      <div className="browse-container">
        <div className="head">
          <div className="header"></div>
        </div>
        <div className="card-grid">
          {this.state.content_list.map(media => {
            return (
              <div key={media.id}>
                <MediaCard media_={media} />
              </div>
            );
          })}
        </div>

        <div className="mobile-card-grid">
          {this.state.content_list.map(media => {
            return (
              <div key={media.id}>
                <MobileMediaCard media_={media} />
                <div
                  style={{
                    height: ".75px",
                    maxWidth: "100%",
                    marginLeft: "18px",
                    marginRight: "18px",
                    backgroundColor: "white",
                    opacity: 0.15
                  }}
                />
              </div>
            );
          })}
        </div>

        <div>
          {/*
          <Pagination
            defaultActivePage={5}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true
            }}
            firstItem={{
              content: <Icon name="angle double left" />,
              icon: true
            }}
            lastItem={{
              content: <Icon name="angle double right" />,
              icon: true
            }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            totalPages={10}
          />
          */}
        </div>
      </div>
    );
  }
}

/*
 
*/
