import React from 'react'
import {
    Card,
    CardBody
} from 'reactstrap'
import { Calendar } from './config/lib'

// const employeeShifts = [
//     {
        
//     }
// ]

const ShiftCalendar = () => {
    return <div className="animated fadeIn">
        <Card>
            <CardBody>
                <Calendar minTime="05:00:00" maxTime="19:00:00" events={[
                    {
                        title: 'Shift 1',
                        rrule: `DTSTART:20190704T080000Z
                        RRULE:UNTIL=20190907T120000Z;BYDAY=MO,TU,WE,TH,FR,SA,SU`,
                        duration: '03:00:00'
                    },
                    {
                        title: 'Shift 2',
                        rrule: `DTSTART:20190704T133000Z
                        RRULE:UNTIL=20190907T170000Z;BYDAY=MO,TU,WE,TH,FR,SA,SU`,
                        duration: '03:00:00'
                    }
                ]} eventRender={(info) => {
                    console.log(info)
                }} />
            </CardBody>
        </Card>
    </div>
}

export default ShiftCalendar