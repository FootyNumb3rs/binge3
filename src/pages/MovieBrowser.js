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

export default class MovieBrowser extends PureComponent {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      genres: {}
    };

    props.setBar_(true);
    window.scrollTo(0, 0);

    getGenres().then(data => {
      var genres_ = Object.assign(data[0], data[1]);
      this.setState({ genres: genres_ });
      if (this.props.movieBrowserState.content_list.length == 0) {
        this.displayMovies();
      }
    });

    //console.log("yo");
  }

  // If only props change
  /*
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
        this.displayMovies(this.props.match.params.media_type);
      }
    }
  }
  */

  // Get Trending
  displayMovies = (page = 1, add = false) => {
    var loaded = undefined;
    loaded = getTrending(this.state.genres, "movie", page);

    loaded.then(data => {
      var all_data = [];

      data[0].results.forEach(d => {
        all_data.push(d);
      });

      if (!add) {
        this.props.setMovieBrowserState({
          ...this.props.movieBrowserState,
          content_list: all_data,
          total_pages: data[0].total_pages
        });
      } else {
        this.props.setMovieBrowserState({
          ...this.props.movieBrowserState,
          //content_list: all_data

          content_list: this.props.movieBrowserState.content_list.concat(
            all_data
          )
        });
      }
    });
  };

  // Display Header
  displayHeader = () => {
    return (
      <div className="head">
        <div className="header">Popular Movies</div>
      </div>
    );
  };

  displayPagination = () => {
    return (
      <div className="desktop-pagination">
        <Pag
          changePage={this.displayMovies}
          //offset={this.movieBrowserState.paginationPage}
          browserState={this.props.movieBrowserState}
          setBrowserState={this.props.setMovieBrowserState}
        />
      </div>
    );
  };

  displayNextPage = () => {
    if (
      (this.props.movieBrowserState.total_pages > 1) &
      (this.props.movieBrowserState.next_page <
        this.props.movieBrowserState.total_pages)
    ) {
      return (
        <div
          className="next-page"
          onClick={() => {
            this.props.setMovieBrowserState({
              ...this.props.movieBrowserState,
              next_page: this.props.movieBrowserState.next_page + 1
            });

            this.displayMovies(this.props.movieBrowserState.next_page, true);
          }}
        >
          NEXT PAGE
        </div>
      );
    }
  };

  handleClick(offset) {
    this.setState({ offset });
  }

  render(props) {
    //console.log(this.state);
    this.props.setPage("movie");
    //console.log(this.props.movieBrowserState.next_page);

    return (
      <div className="browser-container">
        <div className="browse-div">
          {this.displayHeader()}
          <div className="card-grid">
            {this.props.movieBrowserState.content_list.map(media => {
              return (
                <div key={media.id}>
                  <MediaCard media_={media} />
                </div>
              );
            })}
          </div>
          {this.displayPagination()}
          <div className="mobile-card-grid">
            {this.props.movieBrowserState.content_list.map(media => {
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
