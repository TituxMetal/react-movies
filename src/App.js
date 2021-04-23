import React, { useState } from 'react'

import { MoviesList } from '~/components'
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMoviesHandler = async () => {
    setIsLoading(true)
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json()
    const moviesData = data.results.map(movie => ({
      id: movie.episode_id,
      title: movie.title,
      openingText: movie.opening_crawl,
      releaseDate: movie.release_date
    }))

    setIsLoading(false)
    setMovies(moviesData)
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies found</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </>
  )
}

export default App
