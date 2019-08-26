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
                start: get(rule, 'dtstart', null),
                end: get(rule, 'until', null)
            },
            timeRange: {
                start: get(rule, 'dtstart', null),
                end: get(rule, 'until', null)
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
        let startDateStr,
            endDateStr

        if (this.state.dateRange.start) {
            startDateStr = moment(this.state.dateRange.start).format('MM/DD/YYYY')

            if (this.state.timeRange.start) {
                startDateStr += ' ' + moment(this.state.timeRange.start).format('HH:mm')
            }

            startDate = moment(startDateStr).toDate()
        }

        if (this.state.dateRange.end) {
            endDateStr = moment(this.state.dateRange.end).format('MM/DD/YYYY')

            if (this.state.timeRange.end) {
                endDateStr += ' ' + moment(this.state.timeRange.end).format('HH:mm')
            }

            endDate = moment(endDateStr).toDate()
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
        const key = this.key || 'new'
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