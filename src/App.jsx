import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import { useEffect, useState  } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  let [watchlist, setWatchlist] = useState([])

  let handleAddToWatchlist = (movies)=>{
    let newWatchlist = [...watchlist, movies]
    localStorage.setItem('moviesApp', JSON.stringify(newWatchlist))
    setWatchlist(newWatchlist)
    console.log(newWatchlist)
  }

  let handleRemoveFromWatchlist = (movies)=>{
    let filteredWatchlist = watchlist.filter((movie)=>{
      return movie.id != movies.id
    })
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist))
    setWatchlist(filteredWatchlist)
    console.log(filteredWatchlist);
  }

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchlist(JSON.parse(moviesFromLocalStorage))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Banner /> */}
                <Movies watchlist={watchlist} handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList watchlist={watchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} setWatchlist={setWatchlist}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
