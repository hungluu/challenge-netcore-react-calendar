import React, { Component } from 'react'
import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    Label,
    Row
} from 'reactstrap'
import classNames from 'classnames'
import moment from 'moment'
import { map, get, first, padStart, find, findLastIndex, filter } from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import * as PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as dispatchers from './config/dispatchers'
import { Calendar, ShopService, ShiftService, EmployeeService } from './config/lib'
import './ShiftBooking.scss'

class ShiftBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shopId: 1,
            employeeId: "",
            calendarLoading: false,
            events: [],
            bookings: []
        }
    }

    selectEmployee(employeeId) {
        this.setState({ employeeId, calendarLoading: true, bookings: [], events: [] }, async () => {
            await this.fetchEvents()
            await this.fetchBookings()
            this.setState(() => {
                return {
                    calendarLoading: false
                }
            })
        })
    }

    async toggleBooking(booking) {
        const currentBookingIdx = this.findCurrentBookingIndex({
            start: booking.fromDateTime,
            end: booking.toDateTime
        })

        if (currentBookingIdx !== -1) {
            booking = this.state.bookings[currentBookingIdx]
            const removed = await EmployeeService.removeBooking(this.state.employeeId, booking)

            if (removed) {
                await this.setState((state) => {
                    return {
                        bookings: filter(state.bookings, (_, idx) => idx !== currentBookingIdx)
                    }
                })
            }
        } else {
            const created = await EmployeeService.addBooking(this.state.employeeId, booking)

            if (created) {
                await this.setState((state) => {
                    return {
                        bookings: state.bookings.concat([created])
                    }
                })
            }
        }
    }

    findCurrentBookingIndex(event) {
        return findLastIndex(this.state.bookings, (booking) => +booking.fromDateTime === +event.start && +booking.toDateTime === +event.end)
    }

    async fetchBookings () {
        const bookings = await EmployeeService.getBookingsFromEmployee(this.state.employeeId)

        this.setState({
            bookings
        })
    }

    async fetchEvents() {
        const shiftSettings = await ShopService.getShiftSettingsFromShop(this.state.shopId)
        const shopLocations = await ShopService.getShopLocationsFromShop(this.state.shopId)

        this.setState({
            events: map(shiftSettings, ({ locationId, locationName, rule, id }) => {
                const duration = ShiftService.getRuleDuration(rule)
                const location = find(shopLocations, { id : locationId })

                return {
                    title: 'Vincom',
                    rrule: rule,
                    duration: padStart(duration.hours(), 2, 0) + ':' + padStart(duration.minutes(), 2, 0) + ':00',
                    extendedProps: {
                        settingId: id,
                        locationId,
                        locationName: location ? location.name : ""
                    }
                }
            })
        })
    }

    async componentDidMount() {
        this.props.loadEmployees()
    }

    render () {
        const { employees } = this.props

        return <div className="animated fadeIn">
            <Card className="text-white bg-primary">
                <CardBody>
                   <b>Disclaimer</b> : For demonstration purposes only, employee can be selected by following dropdown add shift settings are loaded from first shop you can see in Settings screen. For real usage, employee is attached to current employee-role user who logged in into the portal.
                   Validations haven't been applied though.
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
                                        disabled={!employees.length}
                                        value={this.state.employeeId}
                                        onChange={({ target: { value } }) => this.selectEmployee(parseInt(value))}>
                                        {map(employees, employee => {
                                            return <option value={employee.id} key={employee.id}>{employee.name}</option>
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card className="text-white bg-info">
                <CardBody>
                   <i className="fa fa-info-circle"></i> Please click to select / deselect shifts
                </CardBody>
            </Card>
            <Card className={classNames(this.state.calendarLoading && "card--loading")}>
                <CardBody>
                    <Calendar minTime="04:00:00" maxTime="23:59:59" events={this.state.events} eventRender={({ el, event }) => {
                        const startTime = moment(event.start).format('HH:mm')
                        const endTime = moment(event.end).format('HH:mm')
                        const matchedBookingIdx = this.findCurrentBookingIndex(event)

                        if (matchedBookingIdx !== -1) {
                            el.classList.add('fc-event--selected')
                        } else {
                            el.classList.remove('fc-event--selected')
                        }

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
                    }} eventClick={async ({ el, event }) => {
                        if (el.disabled) {
                            return
                        }

                        el.classList.add('fc-event--pending')
                        el.disabled = true

                        await this.toggleBooking({
                            fromDateTime: event.start,
                            toDateTime: event.end,
                            locationId: event.extendedProps.locationId,
                            employeeId: this.state.employeeId
                        })

                        el.classList.remove('fc-event--pending')
                        el.disabled = false
                    }} />
                </CardBody>
            </Card>
        </div>
    }

    // For demonstration
    componentDidUpdate () {
        const firstEmployeeId = get(first(this.props.employees), 'id', '')

        if (!this.state.employeeId && firstEmployeeId && firstEmployeeId !== this.state.employeeId) {
            this.selectEmployee(firstEmployeeId)
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextState.employeeId !== this.state.employeeId ||
            nextState.employees !== this.state.employees ||
            nextState.calendarLoading !== this.state.calendarLoading ||
            nextProps.employees !== this.props.employees ||
            nextState.bookings !== this.state.bookings
    }
}

ShiftBooking.propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    }))
}

const ShiftBookingStyles = StyleSheet.create({
    label: {
        flexBasis: 140,
        flexGrow: 0
    }
});

export const mapStateToProps = (state) => {
    return get(state, 'shifts', {})
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dispatchers, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShiftBooking)