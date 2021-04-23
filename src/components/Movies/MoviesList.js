import React from 'react'

import Movie from './Movie'
import './MoviesList.css'

const MoviesList = ({ movies }) => (
  <ul>
    {movies.map(movie => (
      <Movie
        key={movie.id}
        title={movie.title}
        releaseDate={movie.releaseDate}
        openingText={movie.openingText}
      />
    ))}
  </ul>
)

export default MoviesList
