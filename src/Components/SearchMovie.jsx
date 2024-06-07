import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import ReleasedObj from "../utils/parseReleaseDate"
import star2 from "../assets/star2.png"

const SearchMovie = ({searchMovieQuery}) => {
  const query = searchMovieQuery
  const [searchMovieResult, setSearchMovieResult] = useState([])
  const [resultIndex, setResultIndex] = useState(1)

  const getSearchMovies = async () => {
    await fetch(`${import.meta.env.VITE_SEARCH_MOVIE_URL}${query}&api_key=43a84b44b9e916d44359dd17e355faf5&page=${resultIndex}`)
      .then( response => response.json())
      .then( result => setSearchMovieResult(result))
  }

  useEffect( () => {
    getSearchMovies()
  }, [query, resultIndex])

  useEffect( () => {
    resultIndex > 1 ? setResultIndex(1) : null
  }, [query])
        
    const ResultIndexNext = () => {
      setResultIndex( prev => prev === searchMovieResult.total_pages ? alert('nopage'): prev + 1)
    }
    const ResultIndexPrev = () => {
      setResultIndex( prev => prev - 1)
    }

  return (
    <div>
    <div className="resultInfo" style={{fontSize: ".9em"}}>
      Search results from: <span className="userInput">{query}</span>
    </div>
    <div className="page page1">
            {
                searchMovieResult.results?.map(m => {
                    return (
                        <Link 
                            to={`/movie/${m.id}/${m.original_title}`}
                            state={{
                                movieTitle: m.title,
                                Id: m.id,
                                genreIds: m.genre_ids,
                                originalTitle: m.original_title,
                                releaseDate: m.release_date,
                                overview: m.overview,
                                backdropPath: m.backdrop_path,
                                posterPath: m.poster_path
                            }}
                        key={m.id}
                        className="film-card">
                            <img src={
                              m.poster_path ? `https://image.tmdb.org/t/p/original/${m?.poster_path}` :
                              `https://img.freepik.com/premium-vector/delete-icon-vector-illustration-design_535345-6895.jpg?w=740`
                              } alt="" className="poster" />
                            <div className="rate">
                                <div><img src={star2} alt="" className="star" />
                                <p className="score">{m.vote_average}</p>
                            </div>
                            </div>
                            <div className="movieTitle">
                                {m.title} (
                                  {
                                    m.release_date ? ReleasedObj(m.release_date).result().year : "null"
                                  })
                            </div>
                        </Link>
                    )
                })
            }
         </div>
          <div className="searchnav">
            {
              resultIndex !== 1 &&
              <button
                className="btnShow showMore"
                onClick={ResultIndexPrev}
              >
                Prev
              </button>
            }
            <span>Page {resultIndex} of {searchMovieResult.total_pages}</span>
            {
              resultIndex !== searchMovieResult.total_pages && 
              <button
                className="btnShow showMore"
                onClick={ResultIndexNext}
              >
                Next
              </button>
            }
          </div>
    </div>
  )
}

export default SearchMovie