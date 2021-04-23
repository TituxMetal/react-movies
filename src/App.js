import React, { useState } from 'react'

import { MoviesList } from '~/components'
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([])

  const fetchMoviesHandler = async () => {
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json()
    const moviesData = data.results.map(movie => ({
      id: movie.episode_id,
      title: movie.title,
      openingText: movie.opening_crawl,
      releaseDate: movie.release_date
    }))

    setMovies(moviesData)
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  )
}

export default App
