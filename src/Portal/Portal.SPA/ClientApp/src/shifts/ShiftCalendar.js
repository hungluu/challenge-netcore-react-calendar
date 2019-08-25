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
import { map, get, first } from 'lodash'
import { StyleSheet, css } from 'aphrodite'
import { Calendar, ShopService } from './config/lib'
import './ShiftCalendar.scss'

class ShiftCalendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shopId: "",
            shops: [],
            calendarLoading: false,
            events: [
                {
                    title: 'Shop Location 1',
                    rrule: `DTSTART:20190704T080000Z
                    RRULE:UNTIL=20190907T120000Z;BYDAY=MO,TU,WE,TH,FR,SA,SU`,
                    duration: '03:00:00',
                    extendedProps: {
                        selectedEmployeeId: 1,
                        employees: [
                            {
                                id: 0,
                                name: 'Not assigned'
                            },
                            {
                                id: 1,
                                name: 'Hung'
                            },
                            {
                                id: 2,
                                name: 'Vuong'
                            }
                        ]
                    }
                },
                {
                    title: 'Shop Location 2',
                    rrule: `DTSTART:20190704T133000Z
                    RRULE:UNTIL=20190907T170000Z;BYDAY=MO,TU,WE,TH,FR,SA,SU`,
                    duration: '03:00:00',
                    extendedProps: {
                        selectedEmployeeId: 0,
                        employees: [
                            {
                                id: 0,
                                name: 'Not assigned'
                            },
                            {
                                id: 1,
                                name: 'Hung'
                            },
                            {
                                id: 2,
                                name: 'Minh'
                            }
                        ]
                    }
                }
            ]
        }
    }

    selectShop(shopId) {
        this.setState({ shopId, calendarLoading: true })
    }

    async componentDidMount() {
        const shops = await ShopService.getShops()
        const firstShopId = get(first(shops), 'id')

        this.setState({ shops })

        if (firstShopId) {
            this.selectShop(firstShopId)
        }
    }

    render () {
        return <div className="animated fadeIn">
            <Card>
                <CardBody>
                    <Row>
                        <Col xs="12" sm="6">
                            <FormGroup row className="mb-0">
                                <Col className={css(ShiftCalendarStyles.label)}>
                                    <Label htmlFor="shift-settings-shop-selection">Shop</Label>
                                </Col>
                                <Col>
                                    <Input type="select"
                                        name="select"
                                        id="shift-settings-shop-selection"
                                        className="form-control"
                                        disabled={!this.state.shops.length}
                                        value={this.state.shopId}
                                        onChange={({ target: { value } }) => this.selectShop(parseInt(value))}>
                                        {map(this.state.shops, shop => {
                                            return <option value={shop.id} key={shop.id}>{shop.name}</option>
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
                    <Calendar minTime="05:00:00" maxTime="19:00:00" events={this.state.events} eventRender={({ el, event }) => {
                        const startTime = moment(event.start).format('HH:mm')
                        const endTime = moment(event.end).format('HH:mm')
                        
                        if (!event.extendedProps.selectedEmployeeId) {
                            el.className = classNames(el.className, 'fc-shift--unassigned')
                        }

                        el.innerHTML = `
                            <div class="fc-time fc-time--bg" data-start="${startTime}" data-full="${startTime} - ${endTime}">
                                <span> ${startTime} - ${endTime} </span>
                            </div>
                            <div class="fc-content">
                                <div class="fc-title">
                                    ${event.title}
                                </div>
                                <div class="fc-shift-employees">
                                    <select>` +
                                        map(event.extendedProps.employees, employee => 
                                            `<option value=${employee.id} ${employee.id === event.extendedProps.selectedEmployeeId ? 'selected="selected"' : ''}> ${employee.name} </option>`
                                        ) +
                                    `</select>
                                </div>
                            </div>
                        `
                    }} />
                </CardBody>
            </Card>
        </div>
    }
}

const ShiftCalendarStyles = StyleSheet.create({
    label: {
        flexBasis: 50,
        flexGrow: 0
    }
});

export default ShiftCalendar