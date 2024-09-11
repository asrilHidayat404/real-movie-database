import { useState } from "react"
import RecommendedMovie from "./RecommendedMovie"
import TrendingMovie from "./TrendingMovie"
import MethodButton from "./MethodButton"
import { useRef } from "react"

const ContainerMovie = () => {
  const [trendIndex, setTrendIndex] = useState(1)
  const [recommendIndex, setRecommendIndex] = useState(1)
  const [trendResultLength, setTrendResultLength] = useState()
  const trendingRef = useRef(null)
  const recommendedRef = useRef(null)

  const nextTrending = () => {
    setTrendIndex(trendIndex + 1)
    window.scrollTo({
      top: trendingRef.current.offsetTop,
      behavior: "smooth"
    })
  }
  const prevTrending = () => {
    setTrendIndex((trendIndex === 1 ? 1 : trendIndex - 1))
  }
  const nextRecommended = () => {
    setRecommendIndex(recommendIndex + 1)
    window.scrollTo({
      top: recommendedRef.current.offsetTop,
      behavior: "smooth"
    })
  }
  const prevRecommended = () => {
    setRecommendIndex((recommendIndex === 1 ? 1 : recommendIndex - 1))
  }
  return (
    <div className="containerMovie">
      <div className="hero-section">
        <h1>Welcome to RMDB Search Engine</h1>
        <p>Find the best movies here. Start exploring now!</p>
      </div>
      <div className="trending-films" ref={trendingRef}>
        <h2>Trending</h2>
        <div className="film-item">
          <div className="film-cards">
            <div className="page page1">
                <TrendingMovie trendIndex={trendIndex} setTrendResultLength={setTrendResultLength} />
            </div>
          </div>
          <div className="nextPrev">
            <MethodButton btnMethod={prevTrending} label={"Prev"} />
            <span>Page {trendIndex}</span>
            <MethodButton btnMethod={nextTrending} label={"Next"} />
          </div>
        </div>
      </div>
      <div className="direkomendasikan" ref={recommendedRef}>
        <h2>Recommended</h2>
        <div className="film-item">
          <div className="film-cards-recommended">
            <RecommendedMovie recommendIndex={recommendIndex} 
            />
          </div>
          <div className="nextPrev">
            <MethodButton btnMethod={prevRecommended} label={"Prev"} />
            <span>Page {recommendIndex}</span>
            <MethodButton btnMethod={nextRecommended} label={"Next"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerMovie
