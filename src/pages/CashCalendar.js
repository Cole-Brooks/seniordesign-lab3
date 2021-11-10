import React from 'react'

import Navbar from '../components/Navbar';

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

const CashCalendar = () => {
    return (
        <div className = "Calendar">
        <Navbar />
        <Calendar localizer={localizer} events = {events} startAccessor={"start"} endAccessor={"end"} style = {{height:750, margin: "25px"}} />
      </div>
    )
}

export default CashCalendar
