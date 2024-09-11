/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import star2 from "../assets/star2.png"
import { Link } from "react-router-dom"
import ReleasedObj from "../utils/parseReleaseDate"

const RecommendedMovie = ({recommendIndex}) => {
    const [movie, setMovie] = useState()
    const fetchMovie = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_RECOMMENDED_MOVIE}?api_key=${import.meta.env.VITE_API_KEY}&page=${recommendIndex}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setMovie(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect( () => {
        fetchMovie()
    }, [recommendIndex])
    return (
        <div className="page page1">
            {
                movie?.map(m => {
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

export default RecommendedMovie
