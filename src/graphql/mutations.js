import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $genre: String!
    $authorId: ID!
  ) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      title
      genre
    }
  }
`

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      title
      id
    }
  }
`

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String!
    $genre: String!
    $authorId: ID!
  ) {
    updateBook(
      id: $id
      title: $title
      genre: $genre
      authorId: $authorId
    ) {
      id
      title
    }
  }
`