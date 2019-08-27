import axios from "axios";

const api_key = "2a7be8fcb2f2e009c23f1016fe3231ea";

export function getGenres() {
  const promises = [];
  const types = ["tv", "movie"];

  types.forEach(type_ => {
    promises.push(
      axios
        .get(
          `https://api.themoviedb.org/3/genre/${type_}/list?api_key=${api_key}&language=en-US`
        )
        .then(res => {
          const genres = {};
          res.data["genres"].map(genre => {
            genres[genre.id] = genre.name;
          });
          return genres;
        })
        .catch(err => {
          console.log(err);
        })
    );
  });

  return axios.all(promises);
}

// TV Menu

export function getTrending(genres, type_) {
  var promises = [];
  var pages = ["1", "2", "3"];

  pages.forEach(page => {
    promises.push(
      axios
        .get(
          `https://api.themoviedb.org/3/${type_}/popular?api_key=${api_key}&language=en-US&page=${page}`
        )
        .then(res => {
          return res.data.results
            .filter(item => item.vote_count > 50)
            .map(item => {
              return {
                id: item.id,
                media_type: type_,
                title: type_ == "tv" ? item.original_name : item.original_title,
                genres: item.genre_ids.slice(0, 3).map(genre => genres[genre]),
                posterLink: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                backdropLink: `https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`,
                overview: item.overview,
                release: item.release_date
              };
            });
        })
        .catch(err => {
          console.log(err);
        })
    );
  });

  return axios.all(promises);
}

export function getSearch(genres, search) {
  var pages = ["1"];
  var promises = [];
  var totalPages = null;

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${search}&page=1`
      )
      .then(res => {
        totalPages = res.data.total_pages;

        return res.data.results
          .filter(
            item => (item.vote_count > 50) & (item.media_type != "person")
          )
          .map(item => {
            return {
              id: item.id,
              title:
                item.media_type == "tv"
                  ? item.original_name
                  : item.original_title,
              media_type: item.media_type,
              genres: item.genre_ids.slice(0, 2).map(genre => genres[genre]),
              posterLink: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              backdropLink: `https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`,
              overview: item.overview,
              release: item.release_date
            };
          });
      })
      .catch(err => {
        console.log(err);
      })
  );
  return axios.all(promises);
}

export function getDialogContent(id, type) {
  var links = [
    `https://api.themoviedb.org/3/${type}/${String(
      id
    )}?api_key=${api_key}&language=en-US`,
    `https://api.themoviedb.org/3/${type}/${String(
      id
    )}/videos?api_key=${api_key}&language=en-US`
  ];
  var promises = [];

  links.forEach((link, i) => {
    promises.push(
      axios
        .get(link)
        .then(res => {
          if (i == 0) {
            return res.data;
          } else {
            var vid_dic = res.data.results[0];
            var needed = {};
            needed["link"] = vid_dic.key;
            needed["site"] = vid_dic.site;
            return needed;
          }
        })
        .catch(err => {
          console.log(err);
        })
    );
  });

  return axios.all(promises);
}

/*
export function getDialogContent(id, type) {
  var links = [``]
  var promises = [];

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${String(
          id
        )}?api_key=${api_key}&language=en-US`
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      })
  );
  return axios.all(promises);
}
*/
