import React, { useState, PureComponent } from "react";
import {
  getTrending,
  getGenres,
  getSearch,
  getInTheaters
} from "../tools/pullData.js";
import MediaCard from "../components/MediaCard.js";
import Pag from "../components/Pag.js";
import MobileMediaCard from "../components/MobileMediaCard.js";
import "../styles/browse.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

export default class Browse extends PureComponent {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      content_list: [],
      genres: {},
      next_page: 2,
      total_pages: undefined
    };
    props.setBar_(true);
    window.scrollTo(0, 0);

    getGenres().then(data => {
      var genres_ = Object.assign(data[0], data[1]);
      this.setState({ genres: genres_ });

      // If there is a search query
      if (props.match.params.search_query) {
        this.displaySearch(props.match.params.search_query);
        // If it's only displaying trending
      } else {
        if (
          props.browserMedia.content_list.length == 0 ||
          props.browserMedia.media_type != this.props.match.params.media_type
        ) {
          this.displayTrending(props.match.params.media_type);
        }
      }
    });

    console.log("yo");
  }

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

  // Get Trending
  displayTrending = (media_type, page = 1, add = false) => {
    var loaded = undefined;

    if (media_type == "movie" || media_type == "tv") {
      loaded = getTrending(this.state.genres, media_type, page);
    } else {
      loaded = getInTheaters(this.state.genres, page);
    }

    loaded.then(data => {
      var all_data = [];

      data[0].results.forEach(d => {
        all_data.push(d);
      });

      if (!add) {
        /*
        this.setState({
          content_list: all_data,
          total_pages: data[0].total_pages
        });
        */
        this.props.setBrowserMedia({
          ...this.props.browserMedia,
          content_list: all_data,
          media_type: this.props.match.params.media_type
        });
      } else {
        this.props.setBrowserMedia({
          ...this.props.browserMedia,
          content_list: this.props.browserMedia.content_list.concat(all_data),
          media_type: this.props.match.params.media_type
        });
      }
    });
  };

  // Get Search
  displaySearch = (search_query, page = 1, add = false) => {
    getSearch(this.state.genres, search_query, page).then(data => {
      var all_data = [];
      console.log(data[0]);
      data[0].results.forEach(d => {
        all_data.push(d);
      });

      if (!add) {
        this.setState({
          content_list: all_data,
          total_pages: data[0].total_pages
        });
      } else {
        this.setState({
          content_list: this.state.content_list.concat(all_data),
          total_pages: data[0].total_pages
        });
      }
    });
  };

  // Display Header
  displayHeader = () => {
    const query = this.props.match.params.search_query;
    if (query) {
      return (
        <div className="head">
          <div className="header">{`Search results for "${query}"`}</div>
        </div>
      );
    } else if (this.props.match.params.media_type == "tv") {
      return (
        <div className="head">
          <div className="header">Popular Shows</div>
        </div>
      );
    } else {
      return (
        <div className="head">
          <div className="header">Popular Movies</div>
        </div>
      );
    }
  };

  displayPagination = () => {
    return (
      <div className="desktop-pagination">
        <Pag changePage={this.displayThisPage} />
      </div>
    );
  };

  displayNextPage = () => {
    if (
      (this.state.total_pages > 1) &
      (this.state.next_page < this.state.total_pages)
    ) {
      return (
        <div
          className="next-page"
          onClick={() => {
            this.setState({ next_page: this.state.next_page + 1 });

            if (this.props.match.params.search_query) {
              this.displaySearch(
                this.props.match.params.search_query,
                this.state.next_page,
                true
              );
            } else {
              this.displayTrending(
                this.props.match.params.media_type,
                this.state.next_page,
                true
              );
            }
          }}
        >
          NEXT PAGE
        </div>
      );
    }
  };

  displayThisPage = page => {
    if (this.props.match.params.search_query) {
      this.displaySearch(this.props.match.params.search_query, page, false);
    } else {
      this.displayTrending(this.props.match.params.media_type, page, false);
    }
  };

  handleClick(offset) {
    this.setState({ offset });
  }

  render(props) {
    console.log(this.state);
    this.props.setPage(this.props.match.params.media_type);

    return (
      <div className="browser-container">
        <div className="browse-div">
          {this.displayHeader()}
          <div className="card-grid">
            {this.props.browserMedia.content_list.map(media => {
              return (
                <div key={media.id}>
                  <MediaCard media_={media} />
                </div>
              );
            })}
          </div>
          {this.displayPagination()}
          <div className="mobile-card-grid">
            {this.props.browserMedia.content_list.map(media => {
              return (
                <div key={media.id}>
                  <MobileMediaCard media_={media} />
                  <div className="browser-divider" />
                </div>
              );
            })}
          </div>
          {this.displayNextPage()}
          <div></div>
        </div>
      </div>
    );
  }
} /*
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
          */
