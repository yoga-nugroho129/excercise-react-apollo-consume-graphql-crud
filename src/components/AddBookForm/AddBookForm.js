import React, { useState } from 'react'
import './AddBookForm.scss'
import { useMutation, useQuery } from '@apollo/client'
import { 
  GET_BOOKS,
  GET_AUTHORS,
  ADD_BOOK
} from '../../graphql'

const AddBookForm = () => {
  const {loading, data} = useQuery(GET_AUTHORS)
  const [dataBook, setDataBook] = useState({
    authorId: "",
    title: "",
    genre: ""
  })
  const {authorId, title, genre} = dataBook
  const [addBook] = useMutation(ADD_BOOK)

  const handleChange = e => {
    const inputedData = {...dataBook}
    inputedData[e.target.name] = e.target.value
    setDataBook(inputedData)
  }

  const handleSubmit = e => {
    e.preventDefault()
    addBook({
      variables: {
        authorId,
        title,
        genre
      },
      refetchQueries: [{ query: GET_BOOKS }]
    })
    setDataBook({
      title: "",
      genre: ""
    })
  }

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <p className="title">Add New Book</p>
      <div className="input-group">
        <label htmlFor="">Title</label>
        <input type="text" name="title" placeholder='Book title' onChange={handleChange} value={title} required />
      </div>
      <div className="input-group">
        <label htmlFor="">Genre</label>
        <input type="text" name="genre" placeholder='Book genre' onChange={handleChange} value={genre} required />
      </div>
      <div className="input-group">
        <label htmlFor="authors">Author</label>
        <select name="authorId" id="authors" onChange={handleChange} required >
          <option defaultChecked value={authorId} >
            { loading ? 'Loading...' : 'Choose Author'}
          </option>
          {
            data !== undefined 
              && data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
          }
        </select>
      </div>
      <div className="btn-container">
        <button type="submit">
          { loading ? "Process" : "Submit"}
        </button>
      </div>
    </form>
  )
}

export default AddBookForm
