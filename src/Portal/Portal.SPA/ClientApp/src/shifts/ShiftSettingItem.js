import React, { useState } from 'react'
import { upperFirst, map } from 'lodash'
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
import { DatePicker } from './config/lib'

const ShiftSettingItem = (props) => {
    const setting = props.setting
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const key = props.key || 'new'
    const daysOfWeek = {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
    }

    return (
        <Card>
            <CardBody>
                <div className="pull-right">
                    <Button type="reset" size="sm" color="danger" onClick={() => props.onDelete(setting)}><i className="fa fa-trash"></i></Button>
                </div>
                <FormGroup row>
                    <Col className={css(ShiftSettingItemStyles.label)}>
                        Date Range #{setting.id}
                    </Col>
                    <Col className="react-datepicker__range-container">
                        <DatePicker
                            selected={startDate}
                            onChange={setStartDate}
                            placeholderText="From date"
                        />

                        <DatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            placeholderText="To date"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col className={css(ShiftSettingItemStyles.label)}>
                        Working hours
                            </Col>
                    <Col className="react-datepicker__range-container">
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
                    <Col className={css(ShiftSettingItemStyles.label)}>
                        Days of week
                            </Col>
                    <Col>
                        {map(daysOfWeek, (daySelected, dayId) => {
                            const inputId = `shift-setting-${key}-${dayId}`

                            return <FormGroup check inline>
                                <Input className="form-check-input" type="checkbox" id={inputId} checked={daySelected} />
                                <Label check className="form-check-label" htmlFor={inputId}>{upperFirst(dayId)}</Label>
                            </FormGroup>
                        })}
                    </Col>
                </FormGroup>
            </CardBody>
        </Card>
    )
}

ShiftSettingItem.propTypes = {
    onDelete: PropTypes.func
}

const ShiftSettingItemStyles = StyleSheet.create({
    label: {
        flexBasis: 130,
        flexGrow: 0
    }
});

export default ShiftSettingItem