import React, { useState } from 'react'

import { MoviesList } from '~/components'
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://swapi.dev/api/films/')
      if (!response.ok) {
        throw new Error(
          `Something went wrong! Status: ${response.status} Message: ${response.statusText}`
        )
      }
      const data = await response.json()
      const moviesData = data.results.map(movie => ({
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date
      }))

      setMovies(moviesData)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch movies</button>
      </section>
      <section>
        {error && <p>{error}</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && !error && movies.length === 0 && <p>No movies found</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </>
  )
}

export default App
