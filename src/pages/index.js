// default imports - came from gatsby
import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Routing imports
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Switch
} from 'react-router-dom'

// Bootstrap imports - npm install -g bootstrap --save
import 'bootstrap/dist/css/bootstrap.min.css'

// Page && Component imports
import Navbar from "../components/Navbar"
import CashCalendar from "./CashCalendar"
import CreateEvent from "./CreateEvent"
import Polls from "./Polls"
import CreatePoll from "./CreatePoll"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Router>
      <main>
        <Routes>
          <Route path="/" exact element={<CashCalendar/>} />
          <Route path="/CreateEvent" exact element={<CreateEvent/>} />
          <Route path="/Polls" exact element={<Polls/>} />
          <Route path="/CreatePoll" exact element={<CreatePoll/>} />
        </Routes>
      </main>
    </Router>
  </Layout>
)

export default IndexPage
