import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import {AuthContext} from "../context/auth"
import firebase from 'gatsby-plugin-firebase'
import { Link } from "gatsby"


const Login = () => {
    const [data, setData] = useState({
       email: "",
       password: "",
       error: null,
    })

    const { setUser } = useContext(AuthContext)

    const handleChange = e => {
       setData({...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
       e.preventDefault()
       setData({...data, error: null})
       try{
           const result = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
           setUser(result)
           navigate("/")
       }catch(err){
           setData({...data, error: err.message })
       }
    }
    return (
       <Layout>
       <Seo title="Login" />
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
           <div>
             <label htmlFor="email">Email</label>
             <br/>
             <input type="text" name="email" value={data.email} onChange={handleChange}/>
             <br/>
             <br/>
           </div>
           <div>
             <label htmlFor="password">Password</label>
             <br/>
             <input type="password" name="password"  value={data.password} onChange={handleChange} />
             <br/>
             <br/>
           </div>
            <div>
             <br/>
             <input type="submit" style={{color:'blue'}} value="Login"/>
             <br/>
           </div>
        </form>
        <div>
           <br/>
             <p style={{ margin: 0 }}>A new user?</p>
             <Link
                 to="/register"
                 style={{
                       color: `blue`,
                       textDecoration: `none`,
                       marginRight:25,
                       alignItems:"center",
                       justifyContent: "space-between"
                       }}>Sign up to get started.
             </Link>
           <br/>
        </div>
        </Layout>
    )
}
export default Login