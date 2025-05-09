import React from "react";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./PAgination";
import Banner from "./Banner";

// intercepter in axios
function Movies({
  watchlist,
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePrevious = () => {
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    if (!(totalPages <= pageNo)) {
      let newpn = pageNo + 1;
      setPageNo(newpn);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=bf5c27fa593849c85afab13dce16e583&language=en-US&page=${pageNo}`
      )
      .then(function (response) {
        setMovies(response.data.results);
        setTotalPages(500);
      });
  }, [pageNo]);

  return (
    <>
      <Banner
        posterPath={movies[1]?.poster_path || "default-poster-path.jpg"}
        name={movies[1]?.original_title || "Loading..."}
      />
      <div className="p-5">
        <div className="text-2xl m-5 font-bold text-center">
          Trending Movies
        </div>
        <div className="flex flex-row gap-6 justify-center flex-wrap">
          {movies.map((movie) => {
            return (
              <MovieCard
                watchlist={watchlist}
                key={movie.id}
                posterPath={movie.poster_path}
                name={movie.original_title}
                handleAddToWatchlist={handleAddToWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                movie={movie}
              />
            );
          })}
        </div>
        <Pagination
          pageNo={pageNo}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default Movies;
