import React, { Component } from 'react'
import { upperFirst, map, assign, get } from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import * as PropTypes from 'prop-types'
import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import { TimeRangePicker, DateRangePicker, ShiftService } from './config/lib'
import moment from 'moment'

class ShiftSettingItem extends Component {
    constructor (props) {
        super(props)

        const { rule: ruleString } = props.data
        const rule = ShiftService.getRuleObject(ruleString)
        this.state = {
            dateRange: {
                start: get(rule, 'options.dtstart', null),
                end: get(rule, 'options.until', null)
            },
            timeRange: {
                start: get(rule, 'options.dtstart', null),
                end: get(rule, 'options.until', null)
            },
            weekDays: ShiftService.getWeekDays(ruleString)
        }
    }

    setDateRange (range) {
        this.setState({
            dateRange: range
        }, () => this.syncValues())
    }

    setTimeRange (range) {
        this.setState({
            timeRange: range
        }, () => this.syncValues())
    }

    setDayOfWeek (dayId, value) {
        this.setState((state) => {
            return assign({}, state, {
                weekDays: assign({}, state.weekDays, {
                    [dayId]: !!value // convert to boolean
                })
            })
        }, () => this.syncValues())
    }

    syncValues () {
        let startDate = null
        let endDate = null

        if (this.state.dateRange.start) {
            startDate = moment.utc(this.state.dateRange.start)

            if (this.state.timeRange.start) {
                const startTime = moment(this.state.timeRange.start)

                startDate.set('hour', startTime.hours()).set('minute', startTime.minutes()).set('second', 0)
            }

            startDate = startDate.toDate()
        }

        if (this.state.dateRange.end) {
            endDate = moment.utc(this.state.dateRange.end)

            if (this.state.timeRange.end) {
                const endTime = moment(this.state.timeRange.end)

                endDate.set('hour', endTime.hours()).set('minute', endTime.minutes()).set('second', 0)
            }

            endDate = endDate.toDate()
        }

        this.props.onChange(assign({}, this.props.data, {
            rule: ShiftService.getRuleString({
                dtstart: startDate,
                until: endDate,
                byweekday: ShiftService.getWeekDayValues(this.state.weekDays)
            })
        }))
    }

    render () {
        const key = this.props.data.id || 'new-misc'
        const identifier = `shift-setting-item-${key}`
        const { data, onDelete } = this.props

        return <Card>
            <CardBody>
                <div className="pull-right">
                    <Button type="reset" size="sm" color="danger" onClick={() => onDelete(data)}><i className="fa fa-trash"></i></Button>
                </div>
                <FormGroup row>
                    <Col className={css(ShiftSettingItemStyles.label)}>
                        Date Range
                    </Col>
                    <Col>
                        <DateRangePicker data={this.state.dateRange} onChange={range => {
                            this.setDateRange(range)
                        }} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col className={css(ShiftSettingItemStyles.label)}>
                        Working hours
                    </Col>
                    <Col>
                        <TimeRangePicker data={this.state.timeRange} onChange={range => {
                            this.setTimeRange(range)
                        }} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col className={css(ShiftSettingItemStyles.label)}>
                        Days of week
                            </Col>
                    <Col>
                        {map(this.state.weekDays, (daySelected, dayId) => {
                            const inputId = `shift-setting-${key}-${dayId}`

                            return <FormGroup check inline key={`${identifier}-${dayId}`}>
                                <Input className="form-check-input" type="checkbox" id={inputId} checked={daySelected} onChange={({ target: { checked : value } }) => {
                                    this.setDayOfWeek(dayId, value)
                                }} />
                                <Label check className="form-check-label" htmlFor={inputId}>{upperFirst(dayId)}</Label>
                            </FormGroup>
                        })}
                    </Col>
                </FormGroup>
            </CardBody>
        </Card>
    }

    shouldComponentUpdate (nextState) {
        return true
    }
}

ShiftSettingItem.propTypes = {
    data: PropTypes.shape({
        rule: PropTypes.string
    }),
    onDelete: PropTypes.func,
    onChange: PropTypes.func
}

const ShiftSettingItemStyles = StyleSheet.create({
    label: {
        flexBasis: 130,
        flexGrow: 0
    }
});

export default ShiftSettingItem