import React from 'react'
import classNames from 'classnames'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'
import DatePicker from 'react-datepicker'

const CustomDatePicker = (props) => <DatePicker {...props} className={classNames('form-control', props.className)} />

export default CustomDatePicker