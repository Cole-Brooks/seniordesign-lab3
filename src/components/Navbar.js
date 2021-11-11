import React from 'react'
import { Link } from "gatsby"

const Navbar = () => {
    return (
        <div>
            <Link to="/">Calendar </Link>
            <Link to="/create-event">Create Event </Link>
            <Link to="/polls">Polls </Link>
            <Link to="/create-poll">Create Poll</Link>
        </div>
    )
}

export default Navbar
