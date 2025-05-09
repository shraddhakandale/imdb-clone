import WatchList from "./WatchList";

function MovieCard({
  watchlist,
  posterPath,
  name,
  handleAddToWatchlist,
  movie,
  handleRemoveFromWatchlist,
}) {
  function doesContain(movies) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movies.id) {
        return true;
      }
    }
    return false;
  }

  // console.log(movie)
  return (
    <div
      className="h-[40vh] w-[200px] bg-cover bg-center rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${posterPath})`,
      }}
    >
      {doesContain(movie) ? (
         <div
         className="m-4 h-8 w-8 rounded-lg bg-gray-900/60 flex justify-center items-center"
         onClick={() => handleRemoveFromWatchlist(movie)}
       >
         &#10060;
       </div>
      ) : (
        <div
          className="m-4 h-8 w-8 rounded-lg bg-gray-900/60 flex justify-center items-center"
          onClick={() => handleAddToWatchlist(movie)}
        >
          &#128525;
        </div>
      )}

      <div className="text-white w-full text-xl text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
