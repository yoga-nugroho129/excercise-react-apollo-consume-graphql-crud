import React from 'react'
import './Nav.scss'
import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../../graphql'

const Nav = () => {
  const { refetch } = useQuery(GET_BOOKS)

  return (
    <nav>
      <div className="container">
        <p>Books & Co</p>
        <div className="btn-group">
          <button className="refresh-btn" onClick={() => refetch()}>Refresh</button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
