import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const VideoDetail = () => {
    let {state} = useLocation()
    const movie = state
    const [genres, setGenre] = useState({})
    const [duration, setDuration] = useState({})
    const [cast, setCast] = useState({})
    const [trailers, setTrailers] = useState()
    const fetchData = async (url, cb) => {
        await fetch(url)
            .then( response => response.json())
            .then(result => cb(result))
    }

    useEffect( () => {
        fetchData(`https://api.themoviedb.org/3/genre/movie/list?api_key=43a84b44b9e916d44359dd17e355faf5&language=en-US`, setGenre)
        fetchData(`https://api.themoviedb.org/3/movie/${movie.Id}?api_key=43a84b44b9e916d44359dd17e355faf5`, setDuration)
        fetchData(`https://api.themoviedb.org/3/movie/${movie.Id}/${import.meta.env.VITE_CREDITS}`, setCast)
        if (!trailers) {
            getTrailer();
        }
    }, [state])


    const genre = genres.genres
    const genreId = movie.genreIds
    const value = genre?.filter(genre => genreId.includes(genre.id)).map(genre => genre.name)
    const casts = cast.cast
    const getTrailer = async () => {
        const id = movie.Id;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=43a84b44b9e916d44359dd17e355faf5&append_to_response=videos`)
            .then(response => response.json())
            .then(result => setTrailers(result.videos.results));
    }

    const trailerUrl = () => {
        if (!trailers) return null;
        const movieTrailers = trailers.filter(item => item.type === "Trailer" && (item.name.includes("Teaser Trailer") || item.name.includes("Official Trailer") || item.name.includes("Main Trailer")));
        if (movieTrailers.length < 1) {
            return null;
        }
        return `https://www.youtube.com/embed/${movieTrailers[0].key}?autoplay=1`;
    }
    console.log(trailerUrl())
    return (
    <>
      <div 
        className="movie_card" 
        id="bright" 
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdropPath}`}}>
        <div className="info_section">
          <div className="movie_header">
            <div className="moviePoster">
              <div className="poster">
                <img src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`} width="200px" />
              </div>
              <div className="detail">
                <div className="title-date">
                  <h1>{movie.movieTitle}</h1>
                  <h4>{movie.releaseDate}</h4>
                </div>
                <div className="duration-genre">
                  <span className="minutes">{duration?.runtime} min</span>
                  <p className="type">
                    {
                        value?.join(", ")
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="movie_desc">
            <p className="text">{movie.overview}</p>
          </div>
        </div>
        <div className="blur_back bright_back"></div>
    </div>
        <div className="blur_back ave_back"></div>
    
    <div className="trl">
      {
        !trailerUrl() ? <p>No Trailer</p> :        
        <iframe
          src={trailerUrl()}
          title="Iframe Example"
          className="trailerOn"
        ></iframe>
      }
    </div>

    <div className="cast">
      <h1>Actor and Actrees</h1>
      <div className="actorList">
        {
            casts?.map(cast => {
                return (
                    <a key={cast.cast_id} href={`https://www.google.com/search?q=${cast.original_name}`} target="_blank">
                        <div className="actor_card">
                        <div className="actorImg">
                            <img 
                              className="actor_image" 
                              src={
                                    cast.profile_path ? `https://image.tmdb.org/t/p/original/${cast.profile_path}` :
                                    `https://img.freepik.com/premium-vector/delete-icon-vector-illustration-design_535345-6895.jpg?w=740`
                                  } 
                              alt=""
                              />
                        </div>
                        <div className="actor_info">
                            <span className="actor_name">{cast.original_name}</span>
                            <span className="as">as</span>
                            <span className="actor_role">{cast.character}</span>
                        </div>
                        </div>
                    </a>
                )
            })
        }
      </div>
    </div>
    </>
  )
}

export default VideoDetail
