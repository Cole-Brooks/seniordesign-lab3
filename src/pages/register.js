import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {AuthContext} from "../context/auth"
import firebase from 'gatsby-plugin-firebase'
import Navbar from "../components/Navbar";
import CashCalendar from "../components/cash-calendar";

const Register = () => {
    const [data, setData] = useState({
       email: "",
       password: "",
       error: null,
    })

    const { setUser } = useContext(AuthContext)

    const handleChange = e => {
       setData({...data, [e.target.name]: e.target.value })
    }

    const handleRegistration = async e => {
       e.preventDefault()
       setData({...data, error: null})
       try{
           const result = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
           setUser(result)
           await navigate("/")
       }catch(err){
           setData({...data, error: err.message })
       }
    }

    const user = firebase.auth().currentUser;

    if (user) {
        return(
            <Layout>
                <Seo title="Home" />
                <Navbar />
                <CashCalendar />
            </Layout>
        )
    }else {

        return (
            <Layout>
                <Seo title="Register"/>
                <h1 style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                }}>Sign Up</h1>
                <form onSubmit={handleRegistration}>
                    <div>
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
                    {data.error ? <p style={{color: 'red'}}>{data.error}</p> : null}
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"}}>
                        <br/>
                        <input type="submit" style={{color: 'blue'}} value="Register"/>
                        <br/>
                    </div>
                </form>
            </Layout>
        )
    }
}

export default Register