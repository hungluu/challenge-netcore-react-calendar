import React, { Component } from 'react'
import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Button
} from 'reactstrap'
import classNames from 'classnames'
import moment from 'moment'
import { map, get, first, padStart } from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import { Calendar, ShopService, ShiftService, EmployeeService } from './config/lib'
import './ShiftBooking.scss'

class ShiftBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeId: "",
            employees: [],
            calendarLoading: false,
            events: [],
            bookings: []
        }
    }

    selectEmployee(employeeId) {
        this.setState({ employeeId, calendarLoading: true }, async () => {
            await this.fetchEvents()
            await this.fetchBookings()
            this.setState(() => {
                return {
                    calendarLoading: false
                }
            })
        })
    }

    addBooking(newBooking) {
        this.setState((state) => {
            return {
                bookings: state.bookings.concat([newBooking])
            }
        })
    }

    async fetchBookings () {
        const bookings = await EmployeeService.getBookingsFromEmployee(this.state.employeeId)

        this.setState({
            bookings
        })
    }

    async fetchEvents() {
        const events = await ShopService.getShiftSettingsFromShop(1)

        this.setState({
            events: map(events, ({ locationId, locationName, rule, id }) => {
                const duration = ShiftService.getRuleDuration(rule)

                return {
                    title: 'Vincom',
                    rrule: rule,
                    duration: padStart(duration.hours(), 2, 0) + ':' + padStart(duration.minutes(), 2, 0) + ':00',
                    extendedProps: {
                        settingId: id,
                        locationId,
                        locationName
                    }
                }
            })
        })
    }

    async componentDidMount() {
        const employees = await ShopService.getEmployeesFromShop(1)
        const firstEmployeeId = get(first(employees), 'id')

        this.setState({ employees })

        if (firstEmployeeId) {
            this.selectEmployee(firstEmployeeId)
        }
    }

    render () {
        return <div className="animated fadeIn">
            <Card className="text-white bg-info">
                <CardBody>
                   <b>Disclaimer</b> : For demonstration purposes only, employee can be selected by following dropdown. For real usage, employee is attached to current employee-role user who logged in into the portal
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Row>
                        <Col xs="12" sm="6">
                            <FormGroup row className="mb-0">
                                <Col className={css(ShiftBookingStyles.label)}>
                                    <Label htmlFor="shift-settings-shop-selection">Select employee</Label>
                                </Col>
                                <Col>
                                    <Input type="select"
                                        name="select"
                                        id="shift-settings-shop-selection"
                                        className="form-control"
                                        disabled={!this.state.employees.length}
                                        value={this.state.employeeId}
                                        onChange={({ target: { value } }) => this.selectEmployee(parseInt(value))}>
                                        {map(this.state.employees, employee => {
                                            return <option value={employee.id} key={employee.id}>{employee.name}</option>
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <Button className="pull-right" type="reset" color="success" onClick={() => this.addNewShiftSetting()}><i className="fa fa-check-circle-o"></i> Save</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card className={classNames(this.state.calendarLoading && "card--loading")}>
                <CardBody>
                    <Calendar minTime="04:00:00" maxTime="23:59:59" events={this.state.events} eventRender={({ el, event }) => {
                        const startTime = moment(event.start).format('HH:mm')
                        const endTime = moment(event.end).format('HH:mm')
                        
                        el.className = classNames(el.className, 'fc-event')

                        el.innerHTML = `
                            <div class="fc-time fc-time--bg" data-start="${startTime}" data-full="${startTime} - ${endTime}">
                                <span> ${startTime} - ${endTime} </span>
                            </div>
                            <div class="fc-content">
                                <div class="fc-title">
                                    <b>${event.title} / </b> ${event.extendedProps.locationName}
                                </div>
                            </div>
                        `
                    }} eventClick={({ el, event }) => {
                        el.className = classNames(el.className, 'fc-event--selected')

                        this.addBooking({
                            fromDate: event.start,
                            toDate: event.end,
                            locationId: event.extendedProps.locationId,
                            employeeId: this.state.employeeId
                        })
                    }} />
                </CardBody>
            </Card>
        </div>
    }

    shouldComponentUpdate (_, nextState) {
        return nextState.employeeId !== this.state.employeeId ||
            nextState.employees !== this.state.employees ||
            nextState.calendarLoading !== this.state.calendarLoading
    }
}

const ShiftBookingStyles = StyleSheet.create({
    label: {
        flexBasis: 140,
        flexGrow: 0
    }
});

export default ShiftBooking