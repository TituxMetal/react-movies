import React, { useCallback, useEffect, useState } from 'react'

import { AddMovie, MoviesList } from '~/components'
import './App.css'

const App = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const apiUrl =
    'https://react-http-8eefe-default-rtdb.firebaseio.com/movies.json'

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(
          `Something went wrong! Status: ${response.status} Message: ${response.statusText}`
        )
      }
      const data = await response.json()
      const loadedData = Object.entries(data).map(([id, obj]) => ({
        id,
        ...obj
      }))

      setMovies(loadedData)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [])

  const addMovieHandler = async movie => {
    const token = process.env.FIREBASE_TOKEN
    const response = await fetch(`${apiUrl}?auth=${token}`, {
      method: 'POST',
      body: JSON.stringify(movie)
    })
    await response.json()

    fetchMoviesHandler()
  }

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
