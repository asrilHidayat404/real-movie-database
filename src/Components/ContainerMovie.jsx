import { useState } from "react"
import RecommendedMovie from "./RecommendedMovie"
import TrendingMovie from "./TrendingMovie"

const ContainerMovie = () => {
  const [trendIndex, setTrendIndex] = useState(1)
  const [recommendIndex, setRecommendIndex] = useState(1)
  const [trendResultLength, setTrendResultLength] = useState()

  const nextTrending = () => {
    setTrendIndex(trendIndex + 1)
  }
  const prevTrending = () => {
    setTrendIndex((trendIndex === 1 ? 1 : trendIndex - 1))
  }
  const nextRecommended = () => {
    setRecommendIndex(recommendIndex + 1)
  }
  const prevRecommended = () => {
    setRecommendIndex((recommendIndex === 1 ? 1 : recommendIndex - 1))
  }
  console.log(recommendIndex)
  return (
    <div className="containerMovie">
      <div className="hero-section">
        <h1>Welcome to RMDB Search Engine</h1>
        <p>Find the best movies here. Start exploring now!</p>
      </div>
      <div className="trending-films">
        <h2>Trending</h2>
        <div className="film-item">
          <div className="film-cards">
            <div className="page page1">
                <TrendingMovie trendIndex={trendIndex} setTrendResultLength={setTrendResultLength} />
            </div>
          </div>
          <div className="nextPrev">
          <button
            className="btnShow showMore"
            onClick={prevTrending}
          >
            Prev
          </button>
          <span>Page {trendIndex}</span>
          <button
            className="btnShow showMore"
            onClick={nextTrending}
          >
            Next
          </button>
          </div>
        </div>
      </div>
      <div className="direkomendasikan">
        <h2>Recommended</h2>
        <div className="film-item">
          <div className="film-cards-recommended">
            <RecommendedMovie recommendIndex={recommendIndex} 
            />
          </div>
          <div className="nextPrev">
            <button
              className="btnShow showMore"
              onClick={prevRecommended}
            >
              Prev
            </button>
            <span>Page {recommendIndex}</span>
            <button
              className="btnShow showMore"
              onClick={nextRecommended}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerMovie
