import React, { useRef } from 'react'

import './AddMovie.css'

const AddMovie = ({ onAddMovie }) => {
  const titleRef = useRef()
  const openingTextRef = useRef()
  const releaseDateRef = useRef()

  const onSubmitHandler = event => {
    event.preventDefault()

    const newMovie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value
    }

    onAddMovie(newMovie)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className='control'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className='control'>
        <label htmlFor='openingText'>Opening Text</label>
        <textarea rows='5' id='openingText' ref={openingTextRef} />
      </div>
      <div className='control'>
        <label htmlFor='releaseDate'>Release Date</label>
        <input type='text' id='releaseDate' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  )
}

export default AddMovie
