import React from 'react'

// Calendar import stuff - learned from video BUILD A REACT JS CALENDAR APP - Darwin Tech
import { Calendar, dateFnsLocalizer } from "react-big-calendar"; 
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";

// Utility Imports
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
    // Note that these events will eventually come from a database instead of being hardcoded
  {
    id: 0,
    title: "Dummy Poll",
    allDay: false,
    start: new Date(2021,10,8,0,0), // not sure why but the month is indexed from zero?
    end: new Date(2021,10,8,10,0)
  }
]

const CashCalendar = () => {
  const [calendar_events, setEvents] = React.useState(events);

  React.useEffect(() => {
    setEvents(updatedEvents())
    const newEvents = updatedEvents().then(listOfEvents => {
      setEvents(listOfEvents)});
      console.log(calendar_events);
  },[])

  const [selected, setSelected] = React.useState();

  const handleSelected = (event) => {
    setSelected(event)
    alert("You clicked on this event " + event['title'])
  };

  return (
      <div className = "calendar">
          <Calendar localizer={localizer} events = {calendar_events} onSelectEvent={handleSelected} startAccessor={"start"} endAccessor={"end"} style = {{height:750, margin: "25px"}} />
      </div>
  )
}

export default CashCalendar
