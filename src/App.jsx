import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import ContainerMovie from "./Components/ContainerMovie"
import VideoDetail from "./Components/VideoDetail"
import Footer from "./Components/Footer"
import SearchMovie from "./Components/SearchMovie"
import { useState } from "react"
import MovieGenre from "./Components/MovieGenre"

const App = () => {
  const [searchMovieQuery, setSearchMovieQuery] = useState("")
  const [genreValue, setGenreValue] = useState({})

  return (
    <div>
      <Navbar setSearchMovieQuery={setSearchMovieQuery} setGenreValue={setGenreValue} />
      <Routes>
        <Route path="/" element={<ContainerMovie />}></Route>
        <Route path="/movie/:id/:title" element={<VideoDetail />}></Route>
        <Route 
          path={`/movie/search/:seachQuery`} 
          element={<SearchMovie searchMovieQuery={searchMovieQuery} />}>      
        </Route>
        <Route
          path={`/movie/genre/:genreId/`}
          element={<MovieGenre genreValue={genreValue} />}
        >
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App