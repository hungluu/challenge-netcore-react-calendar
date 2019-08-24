import React, { Component } from 'react'
import { pick } from 'lodash'
import * as PropTypes from 'prop-types'
import DatePicker from './DatePicker'

class DateRangePicker extends Component {
    constructor (props) {
        const { start, end } = props.data

        super(props)
        this.state = {
            start,
            end,
            minEnd: null,
            maxStart: null
        }
    }

    setStart (start) {
        this.setState({
            start
        }, () => this.syncValues())
    }

    setEnd (end) {
        this.setState({
            end
        }, () => this.syncValues())
    }

    syncValues () {
        this.props.onChange(pick(this.state, 'start', 'end'))

        if (this.state.end) {
            this.setState({
                maxStart: this.state.end
            })
        }

        if (this.state.start) {
            this.setState({
                minEnd: this.state.start
            })
        }
    }

    render () {
        return <div className="react-datepicker__range-container">
            <DatePicker
                selected={this.state.start}
                onChange={date => this.setStart(date)}
                placeholderText="From date"
                maxDate={this.state.maxStart}
            />

            <DatePicker
                selected={this.state.end}
                onChange={date => this.setEnd(date)}
                placeholderText="To date"
                minDate={this.state.minEnd}
            />
        </div>
    }

    shouldComponentUpdate (_, nextState) {
        return nextState.start !== this.state.start ||
            nextState.end !== this.state.end ||
            nextState.minEnd !== this.state.minEnd ||
            nextState.maxStart !== this.state.maxStart
    }
}

DateRangePicker.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    onChange: PropTypes.func
}

export default DateRangePicker