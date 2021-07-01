import React from 'react'
import BookItem from './BookItem'
import './BookList.scss'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../../graphql'

const BookList = () => {
  const {loading, error, data} = useQuery(GET_BOOKS)

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error - {error}</div>

  return (
    <div className="book-list">
      {
        data.books.map(book => <BookItem key={book.id} book={book} />)
      }
    </div>
  )
}

export default BookList
