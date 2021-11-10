import React from 'react'
// Calendar Imports
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Navbar from '../components/Navbar'

const Calendar = () => {
    return (
        <div className="container">
            <Navbar />
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
            />
        </div>
    )
}

export default Calendar
