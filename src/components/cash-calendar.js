import React, { useContext } from "react"
// Utility Imports
import { updatedEvents, convertEvents } from "../utils/events"
// Calendar import stuff - learned from video BUILD A REACT JS CALENDAR APP - Darwin Tech
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { AuthContext } from "../context/auth"
import { navigate } from "gatsby";
// import DatePicker from "react-datepicker";
import { changeEventAttendants } from "../utils/events"

const locales = {
  "en-US": require("date-fns/locale/en-US"),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const CashCalendar = () => {
  const [calendar_events, setEvents] = React.useState([])
  const [displayModal, setDisplayModal] = React.useState(false)
  const { user } = useContext(AuthContext)

  React.useEffect(() => {
    // setEvents(updatedEvents());
    updatedEvents()
      .then(listOfEvents => {
        let returnArray = []
        listOfEvents.forEach(event => {
          let e = convertEvents(event)
          returnArray.push(e)
        })
        setEvents(returnArray)
      })
      .catch(err => {
        alert("Error fetching Events!")
      })
  }, [])

  const [selected, setSelected] = React.useState()

  const handleSelected = event => {
    setSelected(event)
    // setDisplayModal(true);

    // determine if user is owner:
    console.log(event)
    console.log("user id: " + user.uid)
    console.log("owner: " + event['owner_uid'])
    if(user.uid == event['owner_uid']){
      // Give option to remind all participants
      if(window.confirm("Remind all participants?")){
        
      }
    }
    else{
      let people = ""
      if(event["attendants"] != null){
          event["attendants"].forEach(person => {
          people = people + person["name"] + ", "
          })
      }
      else{
          people = "No Attendants"
      }

      let u_name = ""
      let u_email = ""
      let name_default = "First Last"
      let email_default = "your.email@email.com"

      let user_is_attending = false;
      // figure out if the user is attending
      if(people !== "No Attendants"){
          event['attendants'].forEach(person => {
              if(user.email === person['email']){
                  user_is_attending = true;
              }
          })
      }

      if(!user_is_attending){
          if(user != null){
              // Enter user information dialog
              u_name = prompt("Event: " + event["title"] + "\r\nAttendants: " + people + "\nJoin this meeting:\nEmail: " + user.email, name_default)
              u_email = user.email
          }
          else{
              if (window.confirm("Join event with name and email?")){
                  u_name = prompt("Name:", name_default)
                  u_email = prompt("Email:", email_default)

                  console.log(u_name)
                  console.log(u_email)
                  console.log("ATTENDANTS")
                  console.log(event["attendants"])
              }
          }
          if( ( u_name === name_default ) || ( u_name === "" ) || (u_name == null ) ||
              ( u_email === email_default ) || ( u_email === "" ) || ( u_email == null) ){
                  alert("You need to enter a valid name and email to join this event!")
          }
          else{
                  if(event["attendants"] == null){
                      event["attendants"] = []
                  }
                  event["attendants"].push({email: u_email, name: u_name})
                  changeEventAttendants(event['docId'], event['attendants'])
          }
      }
      else{
          alert("Event: " + event["title"] + "\r\nAttendants: " + people + "\nYou're attending this meeting!")
      }

      console.log(event["attendants"])
    }
  }

  return (
    <div className="calendar">
      <Calendar
        localizer={localizer}
        events={calendar_events}
        onSelectEvent={handleSelected}
        startAccessor={"start"}
        endAccessor={"end"}
        style={{ height: 750, margin: "25px" }}
      />
    </div>
  )
}

export default CashCalendar
