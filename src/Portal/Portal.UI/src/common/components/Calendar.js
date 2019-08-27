import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import rrulePlugin from '@fullcalendar/rrule'

import '@fullcalendar/core/main.css'
import '@fullcalendar/timegrid/main.css'

const Calendar = (props) => {
    return <FullCalendar plugins={[ timeGridPlugin, rrulePlugin ]} defaultView="timeGridWeek" {...props} />
}

export default Calendar