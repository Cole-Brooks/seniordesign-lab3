import PropTypes from "prop-types"
import { Link } from "gatsby"
import React, {useContext} from "react"
import {AuthContext} from "../context/auth"
import firebase from 'gatsby-plugin-firebase'
import { navigate } from "gatsby"


const Header = ({ siteTitle }) => {
  const { user } = useContext(AuthContext)

  const handleLogout = async() =>{
     await firebase.auth().signOut()
     navigate("/login")
  }
  return (
  <header
    style={{
      //background: `rebeccapurple`,
      marginBottom: `1.45rem`,
      background:"black",
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1850,
        padding: `1.45rem 1.0875rem`,
        padding: 10,
        justifyContent: "space-between",
        display: "flex",

      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,

          }}
        >
          {siteTitle}
        </Link>
        </h1>
        { !user ?
        <div style={{alignItems:"center", display:"flex"}}>
          <p style={{ margin: 0 , marginRight:25}}>
            <Link
             to="/register"
             style={{
             color: `yellow`,
             textDecoration: `none`,
             }}
            >
            Sign up
            </Link>
          </p>
            <p style={{ margin: 0 , marginRight:25, color: `white`}}>
            Already have an account?</p>
            <p style={{ margin: 0 , marginRight:25}}>
            <Link
              to="/login"
               style={{
               color: `yellow`,
               textDecoration: `none`,
              }}
            >
            Log in
            </Link>
          </p>
        </div>
        :(
        <div style={{alignItems:"center", display:"flex"}}>
          <p style={{ margin: 0 , marginRight:25, color: `white`}}>
            Welcome!</p>
          <p style={{ margin: 0 , marginRight:25}} onClick={handleLogout}>
            <Link
             to="#!"
             style={{
             color: `yellow`,
             textDecoration: `none`,
             }}
            >
            Log out
            </Link>
          </p>
        </div>
        )}
    </div>
  </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
