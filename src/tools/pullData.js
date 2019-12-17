import axios from "axios";

const api_key = "2a7be8fcb2f2e009c23f1016fe3231ea";

/* Get genres */

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
          res.data["genres"].forEach(genre => {
            genres[genre.id] = genre.name;
          });
          return genres;
        })
        .catch(err => {
          //console.log(err);
        })
    );
  });

  return axios.all(promises);
}

/* Get by ID */

export function getById(genres, media_id, media_type) {
  var promises = [];

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${api_key}&language=en-US`
      )
      .then(res => {
        res.data[
          "backdrop_path"
        ] = `https://image.tmdb.org/t/p/original/${res.data.backdrop_path}`;

        res.data[
          "poster_path"
        ] = `https://image.tmdb.org/t/p/original/${res.data.poster_path}`;

        return res.data;
      })
      .catch(err => {
        //console.log(err);
      })
  );

  return axios.all(promises);
}

/* Get In Theaters */

export function getInTheaters(genres, page = 1) {
  var promises = [];

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=${page}`
      )
      .then(res => {
        res.data.results = res.data.results
          //.filter(item => item.vote_count > 50)
          .map(item => {
            return {
              id: item.id,
              media_type: "movie",
              title: item.original_title,
              genres: item.genre_ids.slice(0, 3).map(genre => genres[genre]),
              posterLink: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              backdropLink: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
              overview: item.overview,
              release: item.release_date,
              rating: item.vote_average,
              vote_count: item.vote_count
            };
          });
        return res.data;
      })
      .catch(err => {
        //console.log(err);
      })
  );

  return axios.all(promises);
}

/* Get Trending */

export function getTrending(genres, media_type, page = 1) {
  var promises = [];

  promises.push(
    axios
      .get(
        `
        https://api.themoviedb.org/3/discover/${media_type}?api_key=${api_key}&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&vote_count.gte=50`
      )
      .then(res => {
        res.data.results = res.data.results.map(item => {
          return {
            id: item.id,
            media_type: media_type,
            title:
              media_type == "tv" ? item.original_name : item.original_title,
            genres: item.genre_ids.slice(0, 3).map(genre => genres[genre]),
            posterLink: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
            backdropLink: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
            overview: item.overview,
            release: item.release_date,
            rating: item.vote_average,
            vote_count: item.vote_count,
            first_air_date: item.first_air_date
          };
        });
        return res.data;
      })
      .catch(err => {
        //console.log(err);
      })
  );

  return axios.all(promises);
}

/* Get a search */

export function getSearch(genres, search, page = 1) {
  var promises = [];
  var totalPages = null;

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${search}&page=${page}`
      )
      .then(res => {
        res.data.results = res.data.results
          .filter(
            item => (item.vote_count > 50) & (item.media_type != "person")
          )
          .map(item => {
            return {
              id: item.id,
              media_type: item.media_type,
              title:
                item.media_type == "tv"
                  ? item.original_name
                  : item.original_title,
              genres: item.genre_ids.slice(0, 3).map(genre => genres[genre]),
              posterLink: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              backdropLink: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
              overview: item.overview,
              release: item.release_date,
              rating: item.vote_average,
              vote_count: item.vote_count,
              first_air_date: item.first_air_date
            };
          });

        return res.data;
      })
      .catch(err => {
        //console.log(err);
      })
  );
  return axios.all(promises);
}

export function getCredits(media_id, media_type) {
  var promises = [];

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/${media_type}/${media_id}/credits?api_key=${api_key}`
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        //console.log(err);
      })
  );

  return axios.all(promises);
}

/* Get Trailer Data   */

export function getDialogContent(id, type) {
  var promises = [];

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${String(
          id
        )}/videos?api_key=${api_key}&language=en-US`
      )
      .then(res => {
        var vid_dic = res.data.results[0];
        var needed = {};
        needed["link"] = vid_dic.key;
        needed["site"] = vid_dic.site;
        return needed;
      })
      .catch(err => {
        //console.log(err);
      })
  );

  return axios.all(promises);
}

export function getFeaturedBackdrop(id, type) {
  var promises = [];

  promises.push(
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${String(
          id
        )}/videos?api_key=${api_key}&language=en-US`
      )
      .then(res => {
        var vid_dic = res.data.results[0];
        var needed = {};
        needed["link"] = vid_dic.key;
        needed["site"] = vid_dic.site;
        return needed;
      })
      .catch(err => {
        //console.log(err);
      })
  );

  return axios.all(promises);
}
