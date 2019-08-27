import moment from 'moment'
import { map } from 'lodash'
import request from '../config/request'

const EmployeeService = {
    async getBookingsFromEmployee (employeeId) {
        if (!employeeId) {
            return []
        }

        const bookingRes = await request.get(`employees/${employeeId}/shift_bookings`)
        const bookings = bookingRes.data.data || []

        return this.mapBookingViewModels(bookings)
    },

    async addBooking (employeeId, booking) {
        if (!employeeId) {
            throw Error('Employee id is required')
        }

        const createRes = await request.post(`employees/${employeeId}/shift_bookings`, {
            id: booking.id,
            fromDateTime: moment(booking.fromDateTime).format('YYYY-MM-DD HH:mm'),
            toDateTime: moment(booking.toDateTime).format('YYYY-MM-DD HH:mm'),
            locationId: booking.locationId
        })

        return (createRes.data.data && this.mapBookingViewModel(createRes.data.data.created)) || false
    },

    async removeBooking (employeeId, booking) {
        if (!employeeId) {
            throw Error('Employee id is required')
        }

        const bookingId = booking.id
        
        if (!bookingId) {
            throw Error('Booking id is required')
        }

        const deleteRes = await request.delete(`employees/${employeeId}/shift_bookings/${bookingId}`)

        return (deleteRes.data.data && deleteRes.data.data.deleted) || false
    },

    mapBookingViewModels (bookings) {
        return map(bookings, this.mapBookingViewModel)
    },

    mapBookingViewModel (booking) {
        if (!booking) {
            return null
        }

        return {
            id: booking.id,
            fromDateTime: moment(booking.fromDateTime).toDate(),
            toDateTime: moment(booking.toDateTime).toDate(),
            locationId: booking.locationId
        }
    }
}

export default EmployeeService