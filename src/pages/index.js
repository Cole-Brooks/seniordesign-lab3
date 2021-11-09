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

// utils
import { getEvents, updatedEvents } from "../utils/events"

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

var events = [
  {
    title: "Dummy Poll",
    allDay: false,
    start: new Date(2021,10,8,0,0), // not sure why but the month is indexed from zero?
    end: new Date(2021,10,8,10,0)
  }
]

var eventsFromDatabase = []

const IndexPage = () => {

  React.useEffect(() => {
    const promise = updatedEvents()
    promise.then(updatedEventList => {
      events = updatedEventList;
    })
    console.log(events)
  }, [])

  return (
  <Layout>
    <Seo title="Home" />
    <Calendar localizer={localizer} events = {events} startAccessor={"start"} endAccessor={"end"} style = {{height:750, margin: "25px"}} />
  </Layout>
)}

export default IndexPage
