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
import { updatedEvents, convertEvents } from "../utils/events";

const locales = {
    "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});


const CashCalendar = () => {
    const [calendar_events, setEvents] = React.useState([]);

    React.useEffect(() => {
        // setEvents(updatedEvents());
        updatedEvents()
            .then(listOfEvents => {
                let returnArray = [];
                listOfEvents.forEach(event => {
                    let e = convertEvents(event);
                    returnArray.push(e);
                });
                setEvents(returnArray);
            })
            .catch(err => {
                alert("Error fetching Events!");
            })
    }, []);

    const [selected, setSelected] = React.useState();

    const handleSelected = (event) => {
        setSelected(event);

        let people = "";
        event['attendants'].forEach(person => {
            people = people + person['name'] + ", ";
        });

        alert("Event: " + event['title'] + "\r\nAttendants: " + people);
        console.log(event['attendants']);
    };

    return (
        <div className = "calendar">
            <Calendar localizer={localizer} events={calendar_events} onSelectEvent={handleSelected} startAccessor={"start"} endAccessor={"end"} style = {{height:750, margin: "25px"}} />
        </div>
    );
}

export default CashCalendar;
