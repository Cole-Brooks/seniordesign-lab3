// default imports - came from gatsby
import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Navbar imports
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Switch
} from 'react-router-dom'
import Navbar from "../components/Navbar"

// Pages
import CashCalendar from "./CashCalendar"
import CreateEvent from "./CreateEvent"
import Polls from "./Polls"
import CreatePoll from "./CreatePoll"

import 'bootstrap/dist/css/bootstrap.min.css'

const events = [
  {
    id: 0,
    title: "Dummy Poll",
    allDay: false,
    start: new Date(2021,10,8,0,0), // not sure why but the month is indexed from zero?
    end: new Date(2021,10,8,10,0)
  }
]

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Router>
      <main>
        <Routes>
          <Route path="/" exact element={<CashCalendar/>} />
          <Route path="/CreateEvent" exact element={<CreateEvent />} />
          <Route path="/Polls" exact element={<Polls/>} />
          <Route path="/CreatePoll" exact element={<CreatePoll/>} />
        </Routes>
      </main>
    </Router>
  </Layout>
)

export default IndexPage
