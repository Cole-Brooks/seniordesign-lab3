import React from 'react'
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/authentication"

const Navbar = () => {
    let greeting = ""
    if (isLoggedIn()){
       greeting = `Hello ${getUser().name}`
    }else{
       greeting = "Your are not logged in"
    }
    return (
        <div>
           <span>{greeting}</span>
           <nav>
              <Link style={{ textDecoration: 'none' }} to="/">Calendar </Link>
              {` `}
              <Link style={{ textDecoration: 'none' }} to="/create-event">Create Event </Link>
              {` `}
              <Link style={{ textDecoration: 'none' }} to="/polls">Polls </Link>
              {` `}
              <Link style={{ textDecoration: 'none' }} to="/create-poll">Create Poll</Link>
              {` `}
              {isLoggedIn()? (
                <a
                  href="/"
                  onClick={event => {
                    event.preventDefault()
                    logout(() => navigate(`/app/login`))}
                  }>
                Logout
                </a>):null}
           </nav>
        </div>
    )
}

export default Navbar
