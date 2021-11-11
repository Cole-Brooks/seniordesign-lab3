// default imports - came from gatsby
import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import CashCalendar from "../components/cash-calendar"
import Navbar from "../components/Navbar"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Navbar />
    <CashCalendar />
  </Layout>
)}

export default IndexPage
