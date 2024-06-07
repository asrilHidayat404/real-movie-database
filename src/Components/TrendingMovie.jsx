import { useState, useEffect } from "react"
import star2 from "../assets/star2.png"
import { Link } from "react-router-dom"
import ReleasedObj from "../utils/parseReleaseDate"

const TrendingMovie = ({trendIndex, setTrendResultLength}) => {
    const [movie, setMovie] = useState()

    const fetchMovie = async () => {
        await fetch(`${import.meta.env.VITE_TRENDING_URL}page=${trendIndex}`)
                .then(response => response.json())
                .then( result => {
                    setTrendResultLength(result)
                    setMovie(result)
                })
    }
    console.log(trendIndex)

    useEffect( () => {
        fetchMovie()
    }, [trendIndex])
    return (
        <div className="page page1">
            {
                movie?.results.map(m => {
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
                            <img src={`https://image.tmdb.org/t/p/original/${m.poster_path}`} alt="" className="poster" />
                            <div className="rate">
                                <div><img src={star2} alt="" className="star" />
                                <p className="score">{m.vote_average}</p>
                            </div>
                            </div>
                            <div className="movieTitle">
                                {m.title} ({ReleasedObj(m.release_date).result().year})
                            </div>
                        </Link>
                    )
                })
            }
         </div>
    )
}

export default TrendingMovie
