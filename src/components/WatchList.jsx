import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/fontawesome-free-solid";
import genreids from "../utility/genre";

function WatchList({ watchlist, handleRemoveFromWatchlist, setWatchlist }) {
  console.log(watchlist);
  const [search, setSearch] = useState("");
  const [currentGenre, setSelectedGenres] = useState("All Genres")
  
  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist(sortedIncreasing);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist(sortedDecreasing);
  };

  const uniqueGenreList = [
    'All Genres',
    ...new Set(watchlist.map((movie)=>{return genreids[movie.genre_ids[0]]}))
  ]

  console.log(uniqueGenreList);
  let handleFilter = (genre) => {
    setSelectedGenres(genre)
    console.log(genre);
  };

  return (
    <>
      <div className="flex gap-4 justify-center items-center flex-wrap m-4">

        {uniqueGenreList.map((genre) => {
          return (
            <div onClick={()=>{handleFilter(genre)}} className={`${genre === currentGenre ? "bg-blue-400": "bg-gray-400/50"} px-5 py-2 rounded-xl font-bold text-white hover:cursor-pointer`}>
              {genre}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          type="text"
          value={search}
          className="h-[3rem] border w-[18rem] bg-gray-200 outline-none px-5"
          placeholder="Search movies"
        />
      </div>
      <div className="border overflow-hidden rounded-lg border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2 hover:cursor-pointer">
                  <FontAwesomeIcon icon={faArrowUp} />
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2 hover:cursor-pointer">
                  <FontAwesomeIcon icon={faArrowDown} />
                </div>
              </th>

              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movie)=>{
                if(currentGenre === "All Genres"){
                    return true
                }
                return genreids[movie.genre_ids[0]].toLowerCase().includes(currentGenre.toLocaleLowerCase())
            })
              .filter((movie) => {
                return movie.original_title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movie) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      />
                      <div className="mx-8">{movie.original_title}</div>
                    </td>
                    <td className="">{movie.vote_average}</td>
                    <td className="">{movie.popularity}</td>
                    <td className="">{genreids[movie.genre_ids[0]]}</td>
                    <td
                      className="text-red-800 hover:cursor-pointer"
                      onClick={() => {
                        handleRemoveFromWatchlist(movie);
                      }}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
