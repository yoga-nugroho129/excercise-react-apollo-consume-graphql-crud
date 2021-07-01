import React, { useState, useEffect } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import './EditBookModal.scss'
import { useMutation, useQuery } from '@apollo/client'
import { GET_BOOKS, GET_AUTHORS, UPDATE_BOOK } from '../../graphql'

const EditBookModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedBook
}) => {
  const [edittedBook, setEdittedBook] = useState({})
  const [isRequestSuccess, setIsRequestSuccess] = useState(false)

  const {data} = useQuery(GET_AUTHORS)
  const [updateBook, { loading: mutationLoading }] = useMutation(UPDATE_BOOK)

  useEffect(() => {
    setEdittedBook(selectedBook)
  }, [selectedBook])

  const closeModal = () => {
    setIsEditModalOpen(false)
    setIsRequestSuccess(false)
    setEdittedBook(selectedBook)
  }
  
  const handleChange = e => {
    const inputedData = {...edittedBook}
    inputedData[e.target.name] = e.target.value
    setEdittedBook(inputedData)
  }

  const handleSubmit = e => {
    e.preventDefault()
    let { id, title, genre, author } = edittedBook
    updateBook({
      variables: {
        id,
        title,
        genre,
        authorId: author.id
      },
      onCompleted: setIsRequestSuccess(true),
      refetchQueries: [{ query: GET_BOOKS }],
    })
  }

  return (
    <Modal
      open={isEditModalOpen}
      onClose={closeModal}
      center
    >
      <div className="modal-content">
        <form className="edit-book-form" onSubmit={handleSubmit}>
          <p className="title">Edit Book - {selectedBook.title}</p>
          <hr />
          <div className="input-group">
            <label htmlFor="">Title</label>
            <input type="text" name="title" placeholder='Book title' value={edittedBook.title} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="">Genre</label>
            <input type="text" name="genre" placeholder='Book genre' value={edittedBook.genre} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="authors">Author</label>
            <select name="authorId" id="authors" onChange={handleChange} required >
              <option defaultChecked value={edittedBook.author?.id} >{edittedBook.author?.name}</option>
              {
                data !== undefined 
                  && data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
              }
            </select>
          </div>
          <div className="btn-container">
            <button type="submit" disabled={mutationLoading || isRequestSuccess}>
              { mutationLoading ? "Process" : isRequestSuccess ? "Saved!" : "Save" }
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditBookModal
