import React, {useContext} from "react"
import { Link } from "gatsby"
import {AuthContext} from "../context/auth"


const Navbar = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
           <nav>
           { !user ?
              <div style={{alignItems:"center", display:"flex"}}>
                <p>
                   <Link style={{ textDecoration: 'none' }} to="/">Calendar </Link>
                </p>
              </div>
           :(
             <div style={{alignItems:"center", display:"flex"}}>
                <p>
                   <Link style={{ textDecoration: 'none' }} to="/">Calendar </Link>
                </p>
                <p>
                   <Link style={{ textDecoration: 'none' }} to="/create-event">Create Event </Link>
                </p>
                <p>
                   <Link style={{ textDecoration: 'none' }} to="/polls">Polls </Link>
                </p>
                <p>
                   <Link style={{ textDecoration: 'none' }} to="/create-poll">Create Poll</Link>
                </p>
             </div>
          )}
          </nav>
        </div>
    )
}

export default Navbar
