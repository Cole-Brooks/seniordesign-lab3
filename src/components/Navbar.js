import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-mainbg">

            {/* <NavLink className="navbar-brand navbar-logo" to="/" exact>TeamCash</NavLink> */}

            {/* <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-expanded="fase"
                aria-label="Toggle navigation">
                    <i className="fas fa-bars text-white"></i>
            </button> */}

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>

                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/" exact>
                                Calendar
                            </NavLink>
                        </li>

                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/CreateEvent" exact>
                                Create Event
                            </NavLink>
                        </li>

                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/Polls" exact>
                                Polls
                            </NavLink>
                        </li>

                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/CreatePoll" exact>
                                Create Poll
                            </NavLink>
                        </li>

                    </ul>
            </div>
        </nav>
    )
}

export default Navbar
