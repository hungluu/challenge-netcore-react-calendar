import React, { useState } from 'react'
import { upperFirst, map } from 'lodash'
import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Label,
    Row,
    Input
} from 'reactstrap'
import { DatePicker } from './config/lib'

const ShiftSettingItem = (props) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const key = props.key || 'new'
    const daysOfWeek = {
        monday: false,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
        sunday: false
    }

    return (
        <Row>
            <Col xs="12">
                <Card>
                    <CardBody>
                        <FormGroup row>
                            <Col md="1">
                                Date Range
                            </Col>
                            <Col xs="12" md="11">
                                <DatePicker
                                    selected={startDate}
                                    onChange={setStartDate}
                                    placeholderText="From date"
                                />

                                <DatePicker
                                    selected={endDate}
                                    onChange={setEndDate}
                                    className="ml-4"
                                    placeholderText="To date"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="1">
                                Working hours
                            </Col>
                            <Col xs="12" md="11">
                                <DatePicker
                                    selected={startTime}
                                    onChange={setStartTime}
                                    placeholderText="Start time"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                />

                                <DatePicker
                                    className="ml-4"
                                    selected={endTime}
                                    onChange={setEndTime}
                                    placeholderText="End time"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="1">
                                Days of week
                            </Col>
                            <Col xs="12" md="11">
                                {map(daysOfWeek, (daySelected, dayId) => {
                                    const inputId = `shift-setting-${key}-${dayId}`

                                    return <FormGroup check className="checkbox">
                                        <Input className="form-check-input" type="checkbox" id={inputId} checked={daySelected} />
                                        <Label check className="form-check-label" htmlFor={inputId}>{upperFirst(dayId)}</Label>
                                    </FormGroup>
                                })}
                            </Col>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default ShiftSettingItem