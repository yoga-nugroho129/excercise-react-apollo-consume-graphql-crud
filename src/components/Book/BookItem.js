import React, { useState } from 'react'
import './BookItem.scss'
import { EditBookModal } from '../'
import { useMutation } from '@apollo/client'
import { GET_BOOKS, DELETE_BOOK } from '../../graphql'

const BookItem = ({book}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState({})

  const {title, genre, author, id} = book

  const [deleteBook] = useMutation(DELETE_BOOK)

  const openEditModal = book => {
    setSelectedBook(book)
    setIsEditModalOpen(true)
  }

  const handleDelete = id => {
    deleteBook({
      variables: {id},
      refetchQueries: [{ query: GET_BOOKS }]
    })
  }

  return (
    <>
      <div className='book-item'>
        <div className="top-section">
          <p className='label'>Title:</p>
          <p className="title-value">{title}</p>
        </div>
        <div className="bottom-section">
          <div className="label-group">
            <p className='label'>Author:</p>
            <p className="label-value">{author.name} ({author.age})</p>
          </div>
          <div className="label-group">
            <p className='label'>Genre:</p>
            <p className="label-value">{genre}</p>
          </div>
        </div>
        <div className="btn-group">
          <button className="edit-btn" onClick={() => openEditModal(book)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(id)}>Delete</button>
        </div>
      </div>
      <EditBookModal 
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedBook={selectedBook}
      />
    </>
  )
}

export default BookItem
