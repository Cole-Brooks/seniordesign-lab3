// default imports - came from gatsby
import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Calendar import stuff - learned from video BUILD A REACT JS CALENDAR APP - Darwin Tech
import { Calendar, dateFnsLocalizer } from "react-big-calendar"; 
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

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

    <div className = "App">
      <Calendar localizer={localizer} events = {events} startAccessor={"start"} endAccessor={"end"} style = {{height:750, margin: "25px"}} />
    </div>

  </Layout>
)

export default IndexPage
