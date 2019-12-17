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
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ErrorPage from "../pages/ErrorPage.js";

export default class SearchBrowser extends PureComponent {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      genres: {},
      error: null
    };

    props.setBar_(true);
    window.scrollTo(0, 0);

    getGenres()
      .then(data => {
        var genres_ = Object.assign(data[0], data[1]);
        this.setState({ genres: genres_ });
        this.displaySearch(props.match.params.search_query);
      })
      .catch(error => {
        console.log(error);
        console.log("there was an error");
        this.setState({ error: error });
      });
  }

  // If only props change
  componentDidUpdate(prevProps) {
    prevProps.match.params.search_query !== this.props.match.params.search_query
      ? this.displaySearch(this.props.match.params.search_query)
      : console.log("yo");
  }

  displaySearch = (search_query, page = 1, add = false) => {
    this.props.setSearchBrowserState({
      ...this.props.searchBrowserState,
      content_list: []
      //total_pages: data[0].total_pages
    });
    getSearch(this.state.genres, search_query, page).then(data => {
      var all_data = [];
      console.log(data[0]);
      data[0].results.forEach(d => {
        all_data.push(d);
      });

      if (!add) {
        this.props.setSearchBrowserState({
          ...this.props.searchBrowserState,
          content_list: all_data,
          total_pages: data[0].total_pages
        });
      } else {
        this.props.setSearchBrowserState({
          ...this.props.searchBrowserState,
          content_list: all_data
        });
      }
    });
  };

  // Display Header
  displayHeader = () => {
    const query = this.props.match.params.search_query;
    return (
      <div className="head">
        <div className="header">{`Search results for "${query}"`}</div>
      </div>
    );
  };

  displayPagination = () => {
    return (
      <div className="desktop-pagination">
        {/*
        <Pag
          changePage={this.displayMovies}
          //offset={this.movieBrowserState.paginationPage}
          browserState={this.props.movieBrowserState}
          setBrowserState={this.props.setMovieBrowserState}
        />
  */}
      </div>
    );
  };

  displayNextPage = () => {
    if (
      (this.props.searchBrowserState.total_pages > 1) &
      (this.props.searchBrowserState.next_page <
        this.props.searchBrowserState.total_pages)
    ) {
      return (
        <div
          className="next-page"
          onClick={() => {
            this.props.setSearchBrowserState({
              ...this.props.searchBrowserState,
              next_page: this.props.searchBrowserState.next_page + 1
            });

            this.displaySearch(
              this.props.match.params.search_query,
              this.props.searchBrowserState.next_page,
              true
            );
          }}
        >
          NEXT PAGE
        </div>
      );
    }
  };

  displayThisPage = page => {
    this.displaySearch(this.props.match.params.media_type, page, false);
  };

  handleClick(offset) {
    this.setState({ offset });
  }

  render(props) {
    if (this.state.error) {
      return <ErrorPage />;
    }

    //console.log(this.state);
    this.props.setPage("search");
    //console.log(this.props.searchBrowserState.next_page);

    return (
      <div className="browser-container">
        <div className="browse-div">
          {this.displayHeader()}
          <div className="card-grid">
            {this.props.searchBrowserState.content_list.map(media => {
              return (
                <div key={media.id}>
                  <MediaCard media_={media} />
                </div>
              );
            })}
          </div>
          {/*this.displayPagination()*/}
          <div className="mobile-card-grid">
            {this.props.searchBrowserState.content_list.map(media => {
              return (
                <div key={media.id}>
                  <MobileMediaCard media_={media} />
                  <div className="browser-divider" />
                </div>
              );
            })}
          </div>
          {/*this.displayNextPage()*/}
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
