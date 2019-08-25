import React from 'react'
import moment from 'moment'
import { range, each, pick } from 'lodash'
import DatePicker from './DatePicker'
import * as PropTypes from 'prop-types'
import DateRangePicker from './DateRangePicker'

class TimeRangePicker extends DateRangePicker {
    constructor (props) {
        super(props)

        this.interval = 30
    }

    getExcludedTimeTicksAfter (time) {
        if (!time) {
            return []
        }

        const selectedDay = moment(time)
        const selectedMinute = selectedDay.minute()
        const selectedHour = selectedDay.hour()
        const hours = range(0, selectedMinute >= this.interval ? selectedHour + 1 : selectedHour)
        const minutes = [0, this.interval]

        const excludeTimeTicks = [
            selectedDay.toDate()
        ]

        each(hours, (hour) => {
            each(minutes, (minute) => {
                excludeTimeTicks.push(moment().set('hour', hour).set('minute', minute).toDate())
            })
        })

        return excludeTimeTicks
    }

    getExcludedTimeTicksBefore (time) {
        if (!time) {
            return []
        }

        const selectedDay = moment(time)
        const selectedMinute = selectedDay.minute()
        const selectedHour = selectedDay.hour()
        const hours = range(selectedMinute < this.interval ? selectedHour : selectedHour + 1, 24)
        const minutes = [0, this.interval]

        const excludeTimeTicks = [
            selectedDay.toDate()
        ]

        each(hours, (hour) => {
            each(minutes, (minute) => {
                excludeTimeTicks.push(moment().set('hour', hour).set('minute', minute).toDate())
            })
        })

        return excludeTimeTicks
    }

    render () {
        return <div className="react-datepicker__range-container">
            <DatePicker
                selected={this.state.start}
                onChange={time => this.setStart(time)}
                placeholderText="Start time"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={this.interval}
                dateFormat="h:mm aa"
                timeCaption="Time"
                excludeTimes={this.getExcludedTimeTicksBefore(this.state.end)}
            />

            <DatePicker
                selected={this.state.end}
                onChange={time => this.setEnd(time)}
                placeholderText="End time"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={this.interval}
                dateFormat="h:mm aa"
                timeCaption="Time"
                excludeTimes={this.getExcludedTimeTicksAfter(this.state.start)}
            />
        </div>
    }

    shouldComponentUpdate (_, nextState) {
        return nextState.start !== this.state.start ||
            nextState.end !== this.state.end
    }

    syncValues () {
        this.props.onChange(pick(this.state, 'start', 'end'))
    }
}

TimeRangePicker.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    onChange: PropTypes.func
}


export default TimeRangePicker