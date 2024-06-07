import { useState } from "react"
import logo from "../assets/logo2.png"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { Link } from "react-router-dom"



const Navbar = ({setSearchMovieQuery, setGenreValue}) => {
  const [inputMovie, setInputMovie] = useState("")
  const getGenre = async (e) => {
    const genreId = await e.target.id
    const genreName = await e.target.textContent
    setGenreValue({
      genreId, genreName
    })
    console.log(genreName)
  }
  const navigate = useNavigate()
  const handleValue = (e) => {
    e.preventDefault()
    setSearchMovieQuery(inputMovie)
    navigate(`/movie/search/${inputMovie}`)
  }
  const genreOn = useRef()
  const showGenre = () => {
    !genreOn.current.classList.contains("on") ? genreOn.current.classList.add("on") : genreOn.current.classList.remove("on")
    console.log(!genreOn.current.classList.contains("on"))
  }
  return (
    <div className="navbar">
      <div className="top">
        <div className="darkMode">
          <i className="fa fa-moon-o" aria-hidden="true"></i>
        </div>
        <div className="logo">
          <img src={logo} alt="" width="80px" />
        </div>
        <button className="searchOn">
        <i className="fa fa-search" style={{fontSize: "18px"}}></i>
        </button>
        <div className="search">
          <form>
            <input 
              type="text" 
              placeholder="Search Movie..." 
              name="search" 
              className="inputMovie"
              onChange={(e) => setInputMovie(e.target.value)}
            />
            <button 
              className="searchMovie"
              onClick={(e) => handleValue(e)}
            >
              <i className="fa fa-search" style={{fontSize: "18px"}}></i>
            </button>
          </form>
        </div>
        <div className="ham">
          <div className="hamburger" onClick={showGenre}>
            <span className="span1"></span>
            <span className="span2"></span>
            <span className="span3"></span>
          </div>
        </div>
      </div>
      <div className="bottom" ref={genreOn}>
        <div className="genreList">
          <Link to="/movie/genre/12" className="genre" id="12" onClick={(e) => getGenre(e)}>Adventure</Link>
          <Link to="/movie/genre/16" className="genre" id="16" onClick={(e) => getGenre(e)}>Animation</Link>
          <Link to="/movie/genre/35" className="genre" id="35" onClick={(e) => getGenre(e)}>Comedy</Link>
          <Link to="/movie/genre/80" className="genre" id="80" onClick={(e) => getGenre(e)}>Crime</Link>
          <Link to="/movie/genre/99" className="genre" id="99" onClick={(e) => getGenre(e)}>Documentary</Link>
          <Link to="/movie/genre/18" className="genre" id="18" onClick={(e) => getGenre(e)}>Drama</Link>
          <Link to="/movie/genre/10751" className="genre" id="10751" onClick={(e) => getGenre(e)}>Family</Link>
          <Link to="/movie/genre/14" className="genre" id="14" onClick={(e) => getGenre(e)}>Fantasy</Link>
          <Link to="/movie/genre/36" className="genre" id="36" onClick={(e) => getGenre(e)}>History</Link>
          <Link to="/movie/genre/27" className="genre" id="27" onClick={(e) => getGenre(e)}>Horror</Link>
          <Link to="/movie/genre/10402" className="genre" id="10402" onClick={(e) => getGenre(e)}>Music</Link>
          <Link to="/movie/genre/9648" className="genre" id="9648" onClick={(e) => getGenre(e)}>Mystery</Link>
          <Link to="/movie/genre/10749" className="genre" id="10749" onClick={(e) => getGenre(e)}>Romance</Link>
          <Link to="/movie/genre/878" className="genre" id="878" onClick={(e) => getGenre(e)}>Science Fiction</Link>
          <Link to="/movie/genre/10770" className="genre" id="10770" onClick={(e) => getGenre(e)}>TV Movie</Link>
          <Link to="/movie/genre/53" className="genre" id="53" onClick={(e) => getGenre(e)}>Thriller</Link>
          <Link to="/movie/genre/10752" className="genre" id="10752" onClick={(e) => getGenre(e)}>War</Link>
          <Link to="/movie/genre/37" className="genre" id="37" onClick={(e) => getGenre(e)}>Western</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
