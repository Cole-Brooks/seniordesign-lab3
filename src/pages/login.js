import React, { useState, useContext } from "react"
import { navigate, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {AuthContext} from "../context/auth"
import firebase from 'gatsby-plugin-firebase'


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

    const handleLogin = async e => {
       e.preventDefault()
       setData({...data, error: null})
       try{
           const result = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
           setUser(result)
           await navigate("/")
       }catch(err){
           setData({...data, error: err.message })
       }
    }

    return (
        <Layout >
            <Seo title="Login"/>
             {data.error ? <p style={{color: 'red'}}>{data.error}</p> : null}
            <h1  style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop:'100px',
                          marginBottom:'100px',
            }}>Log in</h1>
            <form onSubmit={handleLogin} >
                <div >
                    <label htmlFor="email" style={{
                          marginLeft:'360px',
                    }}>Email</label>
                    <br/>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                    }}>
                        <input type="text" name="email" value={data.email} onChange={handleChange}/>
                    </div>
                    <br/>
                </div>
                <div>
                    <label htmlFor="password" style={{
                        marginLeft:'360px',
                    }}>Password</label>
                    <br/>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                    }}>
                        <input type="password" name="password" value={data.password} onChange={handleChange}/>
                    </div>
                    <br/>
                </div>
                <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"}}>
                    <br/>
                    <input type="submit" style={{color: 'blue', }} value="Login"/>
                    <br/>
                </div>
            </form>
            <div>
                <br/>
                <p style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                }}>A new user?</p>
                <Link
                    to="/register"
                    style={{
                            color: `blue`,
                            textDecoration: `none`,
                            marginRight: 25,
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom:'220px',

                    }}>Sign up to get started.
                </Link>
                <br/>
            </div>
        </Layout>
    )

}
export default Login