import React, {useContext} from "react"
import { Link, navigate} from "gatsby"
import {AuthContext} from "../context/auth"
import { Stack, Button } from "@mui/material"


const Navbar = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
           <nav>
           { !user ?
            //   <div style={{alignItems:"center", display:"flex"}}>
            //     <p>
            //        <Link style={{ textDecoration: 'none' }} to="/">Calendar </Link>
            //     </p>
            //   </div>
               <Stack spacing={2} direction="row">
                  <Button variant="outlined" onClick={() => navigate("/")}>Calendar</Button>
               </Stack>
           :(
             <div style={{alignItems:"center", display:"flex"}}>
                {/* <p>
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
                </p> */}
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" onClick={() => navigate("/")}>Calendar</Button>
                  <Button variant="outlined" onClick={() => navigate("/create-event")}>Create Event</Button>
                  <Button variant="outlined" onClick={() => navigate("/polls")}>Polls</Button>
                  <Button variant="outlined" onClick={() => navigate("/create-poll")}>Create Poll</Button>
               </Stack>
             </div>
          )}
          </nav>
        </div>
    )
}

export default Navbar
