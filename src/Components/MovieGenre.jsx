import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import star2 from "../assets/star2.png"
import ReleasedObj from "../utils/parseReleaseDate"

const MovieGenre = ({genreValue}) => {
  const query = genreValue
  const [genreMovieResult, setGenreMovieResult] = useState([])
  const [resultIndex, setResultIndex] = useState(1)

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSearchMovies = async () => {
    await fetch(`${import.meta.env.VITE_MOVIE_OF_GENRE_URL}${query.genreId}&certification_country=US&certification.lte=G&sort_by=popularity.desc&page=${resultIndex}`)
      .then( response => response.json())
      .then( result => setGenreMovieResult(result))
  }
  useEffect( () => {
    getSearchMovies()
  }, [getSearchMovies, query, resultIndex])
        
    const ResultIndexNext = () => {
      setResultIndex( prev => prev === genreMovieResult.total_pages ? alert('nopage'): prev + 1)
    }
    const ResultIndexPrev = () => {
      setResultIndex( prev => prev - 1)
    }
    
    console.log(genreMovieResult)
  return (
    <div>
    <div className="resultInfo" style={{fontSize: ".9em"}}>
      Results of Genre: <span className="userInput">{query.genreName}</span>
    </div>
    <div className="page page1">
            {
                genreMovieResult.results?.map(m => {
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
            <span>Page {resultIndex} of {genreMovieResult.total_pages}</span>
            {
              resultIndex !== genreMovieResult.total_pages && 
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

export default MovieGenre
