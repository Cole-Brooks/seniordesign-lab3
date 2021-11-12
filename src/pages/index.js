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
  return (
  <Layout>
    <Seo title="Home" />
    <Navbar />
    <CashCalendar />
  </Layout>
)}

export default IndexPage
