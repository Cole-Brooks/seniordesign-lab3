import React from 'react'
// Calendar Imports
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import Navbar from '../components/Navbar'

const Calendar = () => {
    return (
        <div className="Calendar-Page">
            <Navbar />
            <div className="calendar">
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                />
            </div>
        </div>
    )
}

export default Calendar
