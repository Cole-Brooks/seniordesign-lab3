import React from 'react'
import { Link, navigate } from "gatsby"


const Navbar = () => {
    return (
        <div>
           <nav>
              <Link style={{ textDecoration: 'none' }} to="/">Calendar </Link>
              {` `}
              <Link style={{ textDecoration: 'none' }} to="/create-event">Create Event </Link>
              {` `}
              <Link style={{ textDecoration: 'none' }} to="/polls">Polls </Link>
              {` `}
              <Link style={{ textDecoration: 'none' }} to="/create-poll">Create Poll</Link>
              {` `}
           </nav>
        </div>
    )
}

export default Navbar
