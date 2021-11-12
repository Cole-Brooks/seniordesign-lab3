// default imports - came from gatsby
import * as React from "react"
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Component imports
import CashCalendar from "../components/cash-calendar"
import Navbar from "../components/Navbar"

const IndexPage = () => 
{
  const ranDay = new Date(2021, 10, Math.floor(Math.random() * (30-1 + 1) + 1))

  const attendees = [
    {
      name: "Random Person",
      email: "random.person.email@email.com"
    },
    {
      name: "Random Person2",
      email: "random.person2.email@email.com"
    }
  ]

  return (
  <Layout>
    <Seo title="Home" />
    <Navbar />
    <CashCalendar />
  </Layout>
)}

export default IndexPage
